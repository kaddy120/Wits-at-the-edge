require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
require('./di-setup')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient(6380, 'wits.redis.cache.windows.net',
  {
    auth_pass: process.env.primaryKey,
    tls: { servername: process.env.redisServername }
  })

const flash = require('express-flash')

const { container } = require('./di-setup')
const user = container.resolve('userRepository')
// const groupRouter = require('./routes/group')
const voteRouter = container.resolve('votingRouters')
const linkRouter = container.resolve('linkRouters')
const groupRouter = require('./routes/group')
const passport = container.resolve('passport')
const configPassport = require('./config/passportConfig')
configPassport(user, passport)
const joinExpiryDate = require('./services/groupJoinRequests')
setInterval(joinExpiryDate.joinRequestExpiryDate, 10 * 60 * 1000)

const indexRouter = require('./routes/index')
const accountRouter = container.resolve('accountManagerRouters')
const meetingRouter = container.resolve('meetingRouters')
const covidFormRouter = require('./routes/covidForm')
const inviteUserRouter = require('./routes/inviteUser')
const acceptRequestRouter = require('./routes/acceptToGroup')
const requestRouter = container.resolve('requestRouters')
const { authorization } = require('./middleware/authorization')

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

passport.serializeUser(function (user, cb) {
  cb(null, user.email)
})

passport.deserializeUser(function (email, done) {
  user.getUserByEmail(email).then(user => {
    done(null, user[0])
  }).catch(err => done(err))
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(require('morgan')('combined'))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.set('trust proxy', 1)

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // this should get set to true in production
    httpOnly: false // if true: prevents client side JS from reading the cookie
  }
})
app.use(sessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter)
app.use('/', accountRouter)

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
// io.use(wrap(sessionMiddleware))
io.use((socket, next) => { sessionMiddleware(socket.request, {}, next) })
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))

io.use((socket, next) => {
  if (socket.request.user) {
    next()
  } else {
    next(new Error('unauthorized'))
  }
})

function sendMessage (socket, roomname) {
  redisClient.lrange(roomname, '0', '100', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    data.map(x => {
      const usernameMessage = x.split(':')
      const userName = usernameMessage[0]
      const message = usernameMessage[1]
      const timeSent = '12h00'

      socket.emit('chat message', { userName, message, timeSent }
      )
    })
  })
}

io.on('connection', (socket) => {
  let roomname = ''
  const userId = socket.request.session.passport.user
  socket.on('join', (msg) => {
    roomname = `${msg.groupId}`
    socket.join(`${msg.groupId}`)
    sendMessage(socket, roomname)
  })
  // console.log(socket.request.session.passport.user)
  socket.on('chat message', (msg) => {
    const timeSent = new Date().toISOString().slice(0, 19).replace('T', ' ')
    redisClient.rpush(roomname, `${userId}:${msg}:${timeSent}`)

    io.to(roomname).emit('chat message', { userName: userId, message: msg, timeSent: '15:45' })
  })
})

// app.use() // all end-points under this middleware can only be accessed by signed in user
app.use('/', voteRouter)
app.use('/meeting', meetingRouter)
app.use('/', covidFormRouter)
app.use('/', inviteUserRouter)
app.use('/', acceptRequestRouter)

app.use('/group', groupRouter)
app.use('/group', linkRouter)
app.use('/', voteRouter)

app.use('/request', authorization, requestRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = { server, app }
