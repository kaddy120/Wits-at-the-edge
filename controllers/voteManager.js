const voters = require('../db/voting/user.json')
const model = require('../models/voteValidation')

class voteManager {
  constructor({ votesRepository, userRepository, groupRepository }) {
    this.votesRepository = votesRepository
    this.joinRequests = this.joinRequests.bind(this)
    this.placeVote = this.placeVote.bind(this)
    this.userRepository = userRepository
    this.groupRepository = groupRepository
    this.terminationRequests = this.terminationRequests.bind(this)
    this.placeTerminateVote = this.placeTerminateVote.bind(this)
  }

  async joinRequests(req, res) {
    const voter = req.user
    console.log(voter)
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

  async placeVote(req, res) {
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

  async terminationRequests(req, res) {
    let name = []
    let requests = []
    
    const votes = await this.votesRepository.getNotifications(req.user.email).then(result => { return result.recordset })
    const info = await this.groupRepository.terminateNotification(req.params.groupId).then(result => { return result.recordset })

    if (votes.length == 0) { requests = info }
    else { requests = model.relevantTerminateRequest(info, votes) }
    
    const filteredRequests = requests.filter(request => {
      return request.terminatingMember != req.user.email
    })

    if (filteredRequests.length !== 0) {
     
      for (let index = 0; index < filteredRequests.length; index++) {
        name[index] = await this.votesRepository.getNameOfRequester(filteredRequests[index].memberToBeTerminated).then(result => { return result.recordset })
      }

      res.render('notifications', { title: 'notifications', message: "1", name: name, user: filteredRequests, logged: req.user.email, groupId: req.params.groupId })
    }

    else res.render('notifications', { title: 'notifications', message: "**No termination requests" })
  }

  async placeTerminateVote(req, res) {
    const requestId = req.params.requestId
    const voter = req.params.email
    const choice = req.params.voteChoice

    await this.votesRepository.terminationVote(requestId, voter, choice)
    const getNumOfGroupMembers = await this.votesRepository.getNumOfGroupMembers(req.params.groupId)
    const member = await this.votesRepository.getMemberToBeTerminated(requestId).then(result => { return result.recordset })
    const voteCount = await this.votesRepository.CountVotes(requestId).then(result => { return result.recordset })

    const counter = model.countVotes(voteCount, getNumOfGroupMembers)

    if (counter === true)
      await this.votesRepository.deleteMember(member[0].memberToBeTerminated, req.params.groupId, requestId)
  }
}

module.exports = voteManager
