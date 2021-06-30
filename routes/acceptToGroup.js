const express = require('express')
const router = express.Router()
const { container } = require('../di-setup')
const userRepo = container.resolve('userRepository')
// const verify = require('../models/verification')

router.get('/joinRequest', function (req, res, next) {
  res.render('acceptDemo')
})

router.post('/joinRequest', async function (req, res, next) {
  const email = req.user.email // Get the user who logged in

  // Getting my requests
  const myRequest = await userRepo.getRequests(email)

  if (myRequest.length > 0) res.render('acceptDemoRequest', { notification: myRequest, groupId: 58 })
  else res.redirect('/')
})

router.post('/joinRequest/:userId/:groupId', async function (req, res, next) {
  // console.log('I do pass here')
  // // If accepted is pressed, check number of groups
  // const email = req.user
  // const groupsIn=
})

module.exports = router
