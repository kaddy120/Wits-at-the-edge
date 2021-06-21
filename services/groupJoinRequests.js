const { container } = require('../di-setup')
const votesRepository = container.resolve('votesRepository')
const model = require('../models/voteValidation')
var moment = require('moment')

async function joinRequestExpiryDate() {
    let requests = await votesRepository.getAllJoinRequests().then(result => { return result.recordset })
    let votes
    let getNumOfGroupMembers
    let voteCount
    let counter
    let requesteeGroups
    const filteredRequest = requests.filter(request => {
        return moment().diff(request.time_Stamp, 'hours') < 9
    })

    
    for (var i = 0; i < filteredRequest.length; i++) {
        votes = await votesRepository.getNumOfPeopleVoted(filteredRequest[i].requestId).then(result => { return result.recordset })
        getNumOfGroupMembers = await votesRepository.getNumOfGroupMembers(filteredRequest[i].requestId)
        console.log(votes[0].numOfPeopleVoted)
        if (votes[0].numOfPeopleVoted >= Math.floor(0.3 * getNumOfGroupMembers)) {
           voteCount = await votesRepository.countVotes(filteredRequest[i].requestId).then(result => { return result.recordset })
            counter = model.countVotes(voteCount, getNumOfGroupMembers)
            requesteeGroups = await votesRepository.getRequesteeGroups(filteredRequest[i].email).then(result => { return result.recordset })
            if (counter === true && requesteeGroups.length < 10)
                await votesRepository.acceptRequest(filteredRequest[i].email, filteredRequest[i].groupId)
            await votesRepository.removeFromJoinRequests(filteredRequest[i].groupId)
            console.log("YEAH")
        }
        else{ console.log("NOPE")
        //await votesRepository.removeFromJoinRequests(filteredRequest[i].requestId)
       }
    }

    console.log(filteredRequest)
}

module.exports = { joinRequestExpiryDate }