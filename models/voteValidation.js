
function relevantRequest(requests, votes) {

    for (i = 0; i < requests.length; i++) {
        for (j = 0; j < votes.length; j++) {
            if (votes[j].requestId == requests[i].requestId) {
                requests.splice(i,1)
            }
        }
    }
    return requests
}

function countVotes(voteCount, numOfGroupMembers) {
    let counter = 0
    for (i = 0; i < voteCount.length; i++) {
        if (voteCount[i].voteCount == 1)
         counter++
    }
     if(counter >= 0.5*numOfGroupMembers)
      return true
    else return false
}


module.exports = {
    relevantRequest,
    countVotes
}