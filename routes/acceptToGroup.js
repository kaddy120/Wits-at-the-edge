const express = require('express')
const router = express.Router()
const { container } = require('../di-setup')
const userRepo = container.resolve('userRepository')
const verify = require('../models/verification')

// Route to see all user requests
router.get('/groupJoinRequest', async function (req, res, next) {
  const email = req.user.email
  const myRequest = await userRepo.getRequests(email)
  const numberOfGroups = await userRepo.getNumberOfGroups(email)

  if (myRequest.length > 0) res.render('acceptDemoRequest', { notification: myRequest, groupId: 58 })
  else res.redirect('/')

  if (myRequest.length > 0) {
    const getGroups = await userRepo.getGroups()
    const groupNames = verify.getGroupName(myRequest, getGroups)
    res.render('groupJoinRequest', { notification: myRequest, names: groupNames, numberOfGroups: numberOfGroups.length })
  } else res.redirect('/')
})

// Route to accept a group invite request
router.post('/joinRequest/:userId/:groupId/:joinRequestId', async function (req, res, next) {
  // Get userId and check number of groups user is in
  const email = req.params.userId
  const groupId = req.params.groupId
  const numberOfGroups = await userRepo.getNumberOfGroups(email)
  if (numberOfGroups.length < 10) {
    await userRepo.addJoinRequest(email, groupId)
    const requestId = req.params.joinRequestId
    userRepo.deleteGroupRequest(requestId)
  }
})
router.post('/declineRequest/:userId/:joinRequestId', async function (req, res, next) {
  // Get the join request Id to delete that user
  const requestId = req.params.joinRequestId
  userRepo.deleteGroupRequest(requestId)
})
module.exports = router
