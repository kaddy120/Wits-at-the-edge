const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { container } = require('../di-setup')
const userManager = container.resolve('userManager')

// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const bycrpt = require('bcrypt')
// const user = require('../db/users')

// passport.use(new LocalStrategy(
//   function (email, password, done) {
//     user.getUserByEmail(email).then(user => {
//       if (user.length === 0) { return done(null, false) }

//       bycrpt.compare(password, user.passport, function (err, result) {
//         if (!result) {
//           return done(null, false)
//         }
//         if (err) { console.log(err) }
//       })
//       return done(null, user)
//     }).catch(err => done(err))
//   })
// )

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign-Up page' })
})

router.post('/signup',
  body('name', 'Name is required').notEmpty(),
  body('surname', 'Surname is required').notEmpty(),
  body('email', 'Enter a valid email address').isEmail(),
  body('password', 'password cannot be empty').notEmpty(),
  body('password1').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  }),
  userManager.postUser.bind(userManager)
)

module.exports = router
