const express = require('express')
const router = express.Router()
const voters = require('../db/voting/user.json')
const model = require('../models/voteValidation')

function votingRouters ({ votesRepository }) {
router.get('/join_requests', async function (req, res) {
    const voter = voters.vote1
    const groupId = 2
    const voterGroups = await votesRepository.getVoterGroup(voter).then(result => { return result.recordset })
    const requests = await votesRepository.getRequestsToJoin().then(result => { return result.recordset })
    const requestGroup = model.relevantRequest(requests, voterGroups, groupId)
    console.log(requestGroup)
    let name = []
    let email = []
    let requestId = []
    if (requestGroup != 0) {
        for(i = 0;i < requestGroup.length;i++){
          name[i] = await votesRepository.getNameOfRequester(requestGroup[i].email).then(result => {return result.recordset})
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
  await votesRepository.addVotes(requestId, voter.email, 1)
  const voteCount = await votesRepository.countVotes(requestId).then(result => { return result.recordset})
  const getNumOfGroupMembers = await votesRepository.getNumOfGroupMembers(groupId)
  const counter = model.countVotes(voteCount, getNumOfGroupMembers)
  if(counter == true){
    await votesRepository.acceptRequest(req.params.userId, groupId)
    await votesRepository.removeFromJoinRequests(requestId)
  }
    res.send('Your vote was successfully recorded.')
})

router.post('/downVote/:requestId/:userId', async function (req, res) {
  const voter = voters.vote3
  const groupId = 2
  const requestId = req.params.requestId
  await votesRepository.addVotes(requestId, voter.email, -1)
  res.send('decline vote')
})
return router
}

module.exports = { votingRouters }