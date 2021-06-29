
function relevantRequest(requests, votes) {
    let size_ = requests.length
    for (let i = 0; i < size_; i++) {
        for (let j = 0; j < votes.length; j++) {
            if (votes[j].requestId == requests[i].requestId) {
                requests.splice(i,1)
                i--
                size_--
                break
            }
        }
    }
    return requests
}

function relevantTerminateRequest(terminateRequests, votes) {

    let size_ = terminateRequests.length
    
    for (let i = 0; i < size_; i++) {
        for (let j = 0; j < votes.length; j++) {

            if (votes[j].requestId == terminateRequests[i].terminationId) {
                terminateRequests.splice(i,1)
                i--
                size_--
                break
            }
        }
    }
    return terminateRequests
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
    countVotes,
    relevantTerminateRequest
}