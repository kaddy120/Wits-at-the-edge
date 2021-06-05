const express = require('express')
const router = express.Router()
const voters = require('../db/voting/user.json')
const votingProcess = require('../db/voting')
const model = require('../models/voteValidation')


router.get('/join_requests', async function (req, res, next) {
    const voter = voters.vote1
    const groupId= 2
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
          res.render('vote', { title: 'Join Requests', message: name, userId: email, requestId: requestId })
    }
    else res.render('vote', { title: 'Join Requests', message: '**No join requests' })
})

router.post('/upVote/:name/:surname', function (req, res, next) {
  console.log(req.params.name)
    res.send('page')
    //req.params.groupId = 
})

module.exports = router