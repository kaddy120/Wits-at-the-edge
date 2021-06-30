const express = require('express')
const router = express.Router()

function votingRouters ({ voteManager }) {
  router.get('/:groupId/join_requests', voteManager.joinRequests.bind(voteManager))

  //router.post('/vote/:requestId/voteChoice/:choice', voteManager.placeVote.bind(voteManager))

  router.get('/:groupId/notifications', voteManager.terminationRequests.bind(voteManager))

  //router.post('/:groupId/vote/:requestId/:email/:voteChoice', voteManager.placeTerminateVote.bind(voteManager))
  
  return router
}

module.exports = { votingRouters }
