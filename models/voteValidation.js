
function relevantRequest(requests, voterGroups, currentGroup) {
    var Requests = []
    let count = 0
    for (i = 0; i < requests.length; i++) {
        for (j = 0; j < voterGroups.length; j++) {
            if (voterGroups[j].groupId == requests[i].groupId && requests[i].groupId == currentGroup) {
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

function getVoterGroup (userId) {
    
}

module.exports = {
    relevantRequest,
    countVotes
}