const voters = require('../db/voting/user.json')
const model = require('../models/voteValidation')

class voteManager {
  constructor ({ votesRepository, userRepository }) {
    this.votesRepository = votesRepository
    this.joinRequests = this.joinRequests.bind(this)
    this.placeVote = this.placeVote.bind(this)
    this.userRepository = userRepository
  }

  async joinRequests (req, res) {
    const voter = req.user
    const groupId = req.params.groupId
    const requests = await this.votesRepository.getRequestsToJoin(groupId).then(result => { return result.recordset })
    const votes = await this.votesRepository.getUserVotes(voter).then(result => { return result.recordset })

    let requestGroup = []
    if (votes.length === 0) { requestGroup = requests } else requestGroup = model.relevantRequest(requests, votes)
    const name = []
    const email = []
    const requestId = []

    if (requestGroup.length !== 0) {
      for (let i = 0; i < requestGroup.length; i++) {
        name[i] = await this.votesRepository.getNameOfRequester(requestGroup[i].email).then(result => { return result.recordset })
        email[i] = requestGroup[i].email
        requestId[i] = requestGroup[i].requestId
      }
      res.render('vote', { title: 'Pending Join Requests', message: name, length: requestId.length, requestId: requestId, groupId: groupId })
    } else res.render('vote', { title: 'Pending Join Requests', message: '**There are currently no pending join requests.' })
  }

  async placeVote (req, res) {
    const voter = req.user
    const groupId = req.params.groupId
    const requestId = req.params.requestId
    await this.votesRepository.addVotes(requestId, voter.email, req.params.choice)
    const voteCount = await this.votesRepository.countVotes(requestId).then(result => { return result.recordset })
    const getNumOfGroupMembers = await this.votesRepository.getNumOfGroupMembers(groupId)
    const counter = model.countVotes(voteCount, getNumOfGroupMembers)
    const email = await this.votesRepository.getRequesteeEmail(requestId).then(result => { return result.recordset })
    const requesteeGroups = await this.votesRepository.getRequesteeGroups(email[0].email).then(result => { return result.recordset })

    // user can only join 10 groups at most;
    if (counter === true && requesteeGroups.length <= 10) {
      this.userRepository.createMutualFriends(groupId, email[0].email)
      this.votesRepository.acceptRequest(email[0].email, groupId)
      // if a user joins a group, add his mutual friends from the group
      this.votesRepository.removeFromJoinRequests(requestId)
    }
  }
}

module.exports = voteManager
