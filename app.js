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

require('./di-setup')
const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient(6380, 'wits.redis.cache.windows.net',
  {
    auth_pass: process.env.primaryKey,
    tls: { servername: process.env.redisServername }
  })

const flash = require('express-flash')

require('./di-setup')
const { container } = require('./di-setup')
const user = container.resolve('userRepository')
const voteRouter = container.resolve('votingRouters')
const groupRouter = require('./routes/group')
const passport = container.resolve('passport')
const configPassport = require('./config/passportConfig')
configPassport(user, passport)

const indexRouter = require('./routes/index')
const accountRouter = container.resolve('accountManagerRouters')
const createGroupRouter = require('./routes/createGroup')
const searchGroupRouter = require('./routes/SearchGroup')
const meetingRouter = container.resolve('meetingRouters')
const dashboardRouter = container.resolve('meetingRouters')
const { authorization } = require('./middleware/authorization')

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

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
app.use('/', searchGroupRouter)
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
  redisClient.lrange(roomname, '0', '-1', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    data.map(x => {
      const usernameMessage = x.split(':')
      const redisUsername = usernameMessage[0]
      const redisMessage = usernameMessage[1]

      socket.emit('chat message', redisMessage
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
    redisClient.rpush(roomname, `${userId}:${msg}`)
    io.to(roomname).emit('chat message', msg)
  })
})

// app.use() // all end-points under this middleware can only be accessed by signed in user
app.use('/', authorization, createGroupRouter)
app.use('/', authorization, voteRouter)
app.use('/meeting', authorization, meetingRouter)
app.use('/', authorization, dashboardRouter)
app.use('/group', groupRouter)
app.use('/', voteRouter)
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
