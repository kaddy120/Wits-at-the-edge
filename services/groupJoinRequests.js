const { container } = require('../di-setup')
const votesRepository = container.resolve('votesRepository')
const model = require('../models/voteValidation')
var moment = require('moment')

async function joinRequestExpiryDate () {
    let requests = await votesRepository.getAllJoinRequests().then(result => { return result.recordset })
    let votes
    let getNumOfGroupMembers
    let voteCount
    const filteredRequest = requests.filter(request => {
        return moment().diff(request.time_Stamp, 'hours') < 9
    })

    for(var i = 0;i < filteredRequest.length;i++) {
        votes = await votesRepository.getNumOfPeopleVoted(filteredRequest[i].requestId).then(result => {return result.recordset})
        getNumOfGroupMembers = await votesRepository.getNumOfGroupMembers(filteredRequest[i].groupId)
        if(votes[0].getNumOfPeopleVoted >= Math.floor(0.3*getNumOfGroupMembers)) {
            voteCount = await votesRepository.countVotes(filteredRequest[i].requestId).then(result => { return result.recordset })
        }
        else console.log("NOPE")
       // await votesRepository.removeFromJoinRequests(filteredRequest[i].requestId)
    }
    
    console.log(filteredRequest)
}

module.exports = { joinRequestExpiryDate }