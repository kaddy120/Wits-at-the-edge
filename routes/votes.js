const express = require('express')
const router = express.Router()

function votingRouters ({ voteManager }) {
  
router.get('/join_requests', voteManager.joinRequests.bind(voteManager))

router.post('/vote/:requestId/:userId/voteChoice/:choice', voteManager.placeVote.bind(voteManager))
return router
}

module.exports = { votingRouters }