const express = require('express')
const router = express.Router()
const { container } = require('../di-setup')
const userRepo = container.resolve('userRepository')
const verify = require('../models/verification')

// Route to see all user requests
router.get('/joinRequest', async function (req, res, next) {
  const email = req.user.email
  const myRequest = await userRepo.getRequests(email)

  if (myRequest.length > 0) {
    const getGroups = await userRepo.getGroups()
    const groupNames = verify.getGroupName(myRequest, getGroups)
    res.render('acceptDemoRequest', { notification: myRequest, names: groupNames })
  } else res.redirect('/')
})

// Route to accept a group invite request
router.post('/joinRequest/:userId/:groupId', async function (req, res, next) {
  console.log('I am inside accept')
  // Get userId and check number of groups user is in
  const email = req.params.userId
  const groupId = req.params.groupId
  const numberOfGroups = await userRepo.getNumberOfGroups(email)
  // console.log(numberOfGroups.length)
  if (numberOfGroups < 10) {
    // userRepo.addJoinRequest(email, groupId)
    // Let user know that they have been successfully added
    // Remove them from request list
    const requestId = req.params.joinRequestId
    // userRepo.deleteGroupRequest(requestId)
    console.log('Inside Accept')
  }
})
router.post('/declineRequest/:userId/:joinRequestId', async function (req, res, next) {
  // Get the join request Id to delete that user
  const requestId = req.params.joinRequestId
  console.log('Inside Decline')
  console.log(requestId)
  // userRepo.deleteGroupRequest(requestId)
})
module.exports = router
