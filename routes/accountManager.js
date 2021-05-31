const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { container } = require('../di-setup')
const userManager = container.resolve('userManager')

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
  userManager.postUser
)

module.exports = router
