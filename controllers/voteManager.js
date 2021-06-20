const voters = require('../db/voting/user.json')
const model = require('../models/voteValidation')

class voteManager {
  constructor({ votesRepository }) {
    this.votesRepository = votesRepository
    this.joinRequests = this.joinRequests.bind(this)
    this.placeVote = this.placeVote.bind(this)
  }

  async joinRequests(req, res) {
    const voter = req.user
    const groupId = req.params.groupId
    const votes = await this.votesRepository.getUserVotes(voter).then(result => { return result.recordset })
    const requests = await this.votesRepository.getRequestsToJoin(groupId).then(result => { return result.recordset })
    let requestGroup = []
    console.log(votes.length)
    if (votes.length == 0)
      requestGroup = requests
    else requestGroup = model.relevantRequest(requests, votes)
    const name = []
    const email = []
    const requestId = []
    console.log("requestGroup: ", requestGroup.length)
    if (requestGroup.length !== 0) {
      for (let i = 0; i < requestGroup.length; i++) {

        name[i] = await this.votesRepository.getNameOfRequester(requestGroup[i].email).then(result => { return result.recordset })
        email[i] = requestGroup[i].email
        requestId[i] = requestGroup[i].requestId
      }
      res.render('vote', { title: 'Pending Join Requests', message: name, length: requestId.length, requestId: requestId, groupId: groupId })
    } else res.render('vote', { title: 'Pending Join Requests', message: '**There are currently no pending join requests.' })
  }

  async placeVote(req, res) {
    const voter = req.user
    const groupId = req.params.groupId
    const requestId = req.params.requestId
    console.log(groupId)
    console.log("VOTED")
    await this.votesRepository.addVotes(requestId, voter.email, req.params.choice)
    /*   const voteCount = await this.votesRepository.countVotes(requestId).then(result => { return result.recordset })
       const getNumOfGroupMembers = await this.votesRepository.getNumOfGroupMembers(groupId)
       const counter = model.countVotes(voteCount, getNumOfGroupMembers)
       if (counter === true) {
         await this.votesRepository.acceptRequest(req.params.userId, groupId)
         await this.votesRepository.removeFromJoinRequests(requestId)
       }*/
  }
}

module.exports = voteManager
