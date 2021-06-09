require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
require('./di-setup')
const app = express()

const session = require('express-session')
const flash = require('express-flash')

require('./di-setup')
const { container } = require('./di-setup')
const user = container.resolve('userRepository')
const groupRouter = require('./routes/group')
const passport = container.resolve('passport')
const configPassport = require('./config/passportConfig')
configPassport(user, passport)

const indexRouter = require('./routes/index')
const accountRouter = container.resolve('accountManagerRouters')
const createGroupRouter = require('./routes/createGroup')
const voteRouter = require('./routes/votes')
const groupRouter = require('./routes/group')
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

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // this should get set to true in production
    httpOnly: false // if true: prevents client side JS from reading the cookie
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter)
app.use('/users', accountRouter)
app.use('/database', databaseRouter)
// catch 404 and forward to error handler
app.use('/', createGroupRouter)
app.use('/', searchGroupRouter)

app.use('/', accountRouter)

// app.use() // all end-points under this middleware can only be accessed by signed in user
app.use('/', authorization, createGroupRouter)
app.use('/', authorization, voteRouter)
app.use('/meeting', authorization, meetingRouter)
app.use('/', authorization, dashboardRouter)

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

module.exports = app
