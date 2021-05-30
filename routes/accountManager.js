const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const users = require('../db/users')
const saltRounds = 10

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign-Up page' })
})

router.post('/signup',
  body('name', 'Name is required').notEmpty(),
  body('surname', 'Surname is required').notEmpty(),
  body('email', 'Enter a valid email address').isEmail(),
  body('password', 'password cannot be empty').notEmpty(),
  body('password1', 'Password must match').equals(body.password),

  function (req, res, next) {
    const errors = validationResult(req)
    if (errors.array().length !== 0) {
      return res.status(400).json({ errors: errors.array() })
      // instead of returning a json i should return a page with error message.
    }

    const user = { ...req.body }
    console.log(user)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash
        users.addUser(user).then(addUser => {
          res.render('index')
        }).catch(err => {
          console.log(err)
        })
        if (err) {
          console.log(err)
        }
      })
    })
    res.render('index')
  })

router.get('/logout', function (req, res, next) {

})

router.get('/forgot-password', function (req, res, next) {

})

module.exports = router
