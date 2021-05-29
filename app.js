require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const accountRouter = require('./routes/accountManager')
const databaseRouter = require('./routes/database')
const app = express()

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     // User.findOne({ username: username }, function (err, user) {
//     //   if (err) { return done(err) }
//     //   if (!user) { return done(null, false) }
//     //   if (!user.verifyPassword(password)) { return done(null, false) }
//       return done(null, user)
//     })
//   }
// ))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/', accountRouter)

// app.use('/database', databaseRouter)
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
