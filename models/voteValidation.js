
function relevantRequest(requests, voterGroups) {
    var Requests = []
    let count = 0
    for (i = 0; i < requests.length; i++) {
        for (j = 0; j < voterGroups.length; j++) {
            if (voterGroups[j].groupId == requests[i].groupId) {
                Requests[count] = requests[i]
                count++
            }
        }
    }
    if (Requests.length >= 1)
        return Requests
    else return 0
}

function countVotes(voteCount, numOfGroupMembers) {
    let counter = 0
    for (i = 0; i < voteCount.length; i++) {
        counter = counter + voteCount[i].voteCount
    }
     if(counter >= 0.5*numOfGroupMembers)
      return true
    else return false
}

module.exports = {
    relevantRequest,
    countVotes
}