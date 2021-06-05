require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('./di-setup')
const app = express()

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
require('./di-setup')
const { container } = require('./di-setup')
const user = container.resolve('userRepository')

const indexRouter = require('./routes/index')
const accountRouter = require('./routes/user')
const databaseRouter = require('./routes/database')
const createGroupRouter = require('./routes/createGroup')
const groupRouter = require('./routes/group')
const voteRouter = require('./routes/votes')


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

const Strategy = require('passport-local').Strategy

const bycrpt = require('bcrypt')

passport.use(new Strategy(
  { // or whatever you want to use
    usernameField: 'email', // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },
  function (username, password, done) {
    user.getUserByEmail(username).then(user => {
      if (user.length === 0) { return done(null, false, { message: ' user is not found' }) }

      bycrpt.compare(password, user[0].passwordHash, function (err, result) {
        if (!result) {
          return done(null, false, { message: 'password donnot match' })
        }
        if (err) { done(err) }
        return done(null, user[0])
      })
    }).catch(err => done(err))
  })
)

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

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter)
app.use('/database', databaseRouter)
app.use('/', createGroupRouter)
// catch 404 and forward to error handler

app.use('/', accountRouter)
app.use('/group', groupRouter)
app.use('/', voteRouter)

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/')
  })
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
