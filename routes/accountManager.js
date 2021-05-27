const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

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
  body('password1', 'password do not match').equals(body.password),

  function (req, res, next) {
    const errors = validationResult(req)
    if (errors) {
      return res.status(400).json({ errors: errors.array() })
    }

    const name = req.body.name
    const email = req.body.emailAddress
    const surname = req.body.surname
    const password = req.body.password
    const password1 = req.body.password1
    const id = req.body.studentNumber

    res.render('index')
  })

router.get('/logout', function (req, res, next) {

})

router.get('/forgot-password', function (req, res, next) {

})

module.exports = router
