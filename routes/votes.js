const express = require('express')
const router = express.Router()
const voters = require('../db/voting/user.json')
const votingProcess = require('../db/voting')
const model = require('../models/voteValidation')


router.get('/join_requests', async function (req, res, next) {
    const voter = voters.vote1
    const groupId = 2
    const voterGroups = await votingProcess.getVoterGroup(voter).then(result => { return result.recordset })
    const requests = await votingProcess.getRequestsToJoin().then(result => { return result.recordset })
    const requestGroup = model.relevantRequest(requests, voterGroups, groupId)
    console.log(requestGroup)
    let name = []
    let email = []
    let requestId = []
    if (requestGroup != 0) {
        for(i = 0;i < requestGroup.length;i++){
          name[i] = await votingProcess.getNameOfRequester(requestGroup[i].email).then(result => {return result.recordset})
          email[i] = requestGroup[i].email
          requestId[i] = requestGroup[i].requestId
        }
        console.log("name:", name)
        console.log("email:", email)
        console.log("requestId: ", requestId)
          res.render('vote', { title: 'Pending Join Requests', message: name, length: requestId.length, requestId: requestId, email: email })
    }
    else res.render('vote', { title: 'Pending Join Requests', message: '**There are currently no pending join requests.' })
})

router.post('/upVote/:requestId/:userId', async function (req, res) {
  const voter = voters.vote3
  const groupId = 2
  const requestId = req.params.requestId
  console.log("requestId:", requestId, "email: ", req.params.userId)
  await votingProcess.addVotes(requestId, voter.email, 1)
  const voteCount = await votingProcess.countVotes(requestId).then(result => { return result.recordset})
  const getNumOfGroupMembers = await votingProcess.getNumOfGroupMembers(groupId)
  const counter = model.countVotes(voteCount, getNumOfGroupMembers)
  if(counter == true){
    await votingProcess.acceptRequest(req.params.userId, groupId)
    await votingProcess.removeFromJoinRequests(requestId)
  }
    res.send('Your vote was successfully recorded.')
})

router.post('/downVote/:requestId/:userId', async function (req, res) {
  const voter = voters.vote3
  const groupId = 2
  const requestId = req.params.requestId
  await votingProcess.addVotes(requestId, voter.email, -1)
  res.send('decline vote')
})

module.exports = router