const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { alreadyLogedin } = require('../middleware/authorization')

function accountManagerRouters({ userManager, passport }) {
  router.get('/signup', alreadyLogedin, function (req, res, next) {
    res.render('signup', { title: 'Sign-Up page' })
  })

  router.get('/address/name/:userName/surname/:userSurname/email/:userEmail/school/:schoolName/YOS/:yos/Password/:password', function (req, res, next) {
    res.render('address', {
      title: 'Fill in Address', name: req.params.userName, surname: req.params.userSurname, email: req.params.userEmail,
      school: req.params.schoolName, YOS: req.params.yos, password: req.params.password
    })
  })

  router.post('/address', userManager.addUser.bind(userManager))

  router.post('/signup', alreadyLogedin,
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

  router.get('/login', alreadyLogedin, (req, res) => {
    res.render('login')
  })

  router.post('/login', alreadyLogedin,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    function (req, res) {
      res.redirect('/')
    })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
module.exports = { accountManagerRouters }
