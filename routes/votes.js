const express = require('express')
const router = express.Router()
const voters = require('../db/groupsVoting/user.json')
const votingProcess = require('../db/groupsVoting/voteProcess')
const model = require('../models/voteValidation')

router.get('/voting', async function (req, res) {
    const voter = voters.vote1
    const voterGroups = await votingProcess.getVoterGroup(voter).then(result => { return result.recordset })
    const requests = await votingProcess.getRequestsToJoin().then(result => { return result.recordset })
    const requestGroup = model.relevantRequest(requests, voterGroups)

    if (requestGroup != 0) {
        res.send(requestGroup)
        await votingProcess.addVotes(voter).then(result => { return result.recordset })
    }
    const voteCount = await votingProcess.countVotes().then(result => { return result.recordset })
    const numOfGroupMembers = await votingProcess.getNumOfGroupMembers(requestGroup[0].groupId)
    const counter = model.countVotes(voteCount, numOfGroupMembers)
    if (counter == true)
        await votingProcess.acceptRequest(requestGroup[0].email, requestGroup[0].groupId)
})

module.exports = router