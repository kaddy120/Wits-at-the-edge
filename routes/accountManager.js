const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { alreadyLogedin } = require('../middleware/authorization')
const constants = require('../constants')

function accountManagerRouters ({ userManager, passport }) {
  router.get('/signup', alreadyLogedin, function (req, res, next) {
    res.render('signup', constants)
  })

  router.post('/address', alreadyLogedin, userManager.addUser.bind(userManager))

  router.post('/signup', alreadyLogedin,
    body('name', 'Name is required').notEmpty(),
    body('surname', 'Surname is required').notEmpty(),
    body('email', 'Enter a valid email address').isEmail(),
    body('yearOfStudy').custom((value, { req }) => {
      if (!constants.YOS.includes(value)) {
        throw new Error('invalid year of study')
      }
      return true
    }),
    body('school').custom((value, { req }) => {
      if (!constants.schools.includes(value)) {
        throw new Error('invalid study field')
      }
      return true
    }),
    body('password', 'password cannot be empty').notEmpty(),
    body('password1').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    }),
    userManager.postUser.bind(userManager)
  )

  router.get('/login', alreadyLogedin, (req, res) => {
    res.render('login')
  })

  router.post('/login', alreadyLogedin,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    function (req, res) {
      const redirectTo = req.session.redirectTo
      req.session.redirectTo = null
      res.redirect(redirectTo || '/group/dashboard')
    })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/group/all/1')
  })

  return router
}
module.exports = { accountManagerRouters }
