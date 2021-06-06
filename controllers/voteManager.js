const voters = require('../db/voting/user.json')
const model = require('../models/voteValidation')

class voteManager {
    constructor ({votesRepository}) {
        this.votesRepository = votesRepository
        this.joinRequests = this.joinRequests.bind(this)
        this.placeVote = this.placeVote.bind(this)
    }

    async joinRequests (req, res) {
    const voter = voters.vote1
    const groupId = 2
    const voterGroups = await this.votesRepository.getVoterGroup(voter).then(result => { return result.recordset })
    const requests = await this.votesRepository.getRequestsToJoin().then(result => { return result.recordset })
    const requestGroup = model.relevantRequest(requests, voterGroups, groupId)
    console.log(requestGroup)
    let name = []
    let email = []
    let requestId = []
    if (requestGroup != 0) {
        for(i = 0;i < requestGroup.length;i++){
          name[i] = await this.votesRepository.getNameOfRequester(requestGroup[i].email).then(result => {return result.recordset})
          email[i] = requestGroup[i].email
          requestId[i] = requestGroup[i].requestId
        }
        console.log("name:", name)
        console.log("email:", email)
        console.log("requestId: ", requestId)
          res.render('vote', { title: 'Pending Join Requests', message: name, length: requestId.length, requestId: requestId, email: email })
    }
    else res.render('vote', { title: 'Pending Join Requests', message: '**There are currently no pending join requests.' })
    }

    async placeVote (req, res) {
        const voter = voters.vote5
        const groupId = 2
        const requestId = req.params.requestId
        console.log("requestId:", requestId, "email: ", req.params.userId)
        await this.votesRepository.addVotes(requestId, voter.email, req.params.choice)
        const voteCount = await this.votesRepository.countVotes(requestId).then(result => { return result.recordset})
        const getNumOfGroupMembers = await this.votesRepository.getNumOfGroupMembers(groupId)
        const counter = model.countVotes(voteCount, getNumOfGroupMembers)
        if(counter == true){
          await this.votesRepository.acceptRequest(req.params.userId, groupId)
          await this.votesRepository.removeFromJoinRequests(requestId)
        }
          res.send('Your vote successfully recorded.')
    }
}

module.exports = voteManager