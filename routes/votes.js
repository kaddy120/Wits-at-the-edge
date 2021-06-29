const express = require('express')
const router = express.Router()

function votingRouters ({ voteManager }) {
  router.get('/join_requests/:groupId/', voteManager.joinRequests.bind(voteManager))

  router.post('/vote/:requestId/:groupId/voteChoice/:choice', voteManager.placeVote.bind(voteManager))

  router.get('/group/:groupId/notifications', voteManager.terminationRequests.bind(voteManager))

  router.post('/group/:groupId/vote/:requestId/:email/:voteChoice', voteManager.placeTerminateVote.bind(voteManager))
  
  return router
}

module.exports = { votingRouters }
