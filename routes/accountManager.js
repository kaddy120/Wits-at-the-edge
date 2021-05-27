const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', function (req, res, next) {

})

router.post('/login', function (req, res, next) {

})

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign-Up page' })
})

router.post('/signup',
  body('name', 'Name is required').notEmpty(),
  body('surname', 'Surname is required').notEmpty(),
  body('emailAddress', 'Enter a valid email address').isEmail(),
  body('password', 'password cannot be empty').notEmpty(),
  body('password1').matches(body.password).withMessage('Password must match'),

  function (req, res, next) {
    console.log(req.body.password)
    console.log(req.body.password1)
    const errors = validationResult(req)
    if (errors.array().length !== 0) {
      return res.status(400).json({ errors: errors.array() })
      // instead of returning a json i should return a page with error message.
    }

    const name = req.body.name
    const email = req.body.emailAddress
    const surname = req.body.surname
    const password = req.body.password
    const id = req.body.studentNumber

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // password = hash
      })
    })

    res.render('index')
  })

router.get('/logout', function (req, res, next) {

})

router.get('/forgot-password', function (req, res, next) {

})

module.exports = router
