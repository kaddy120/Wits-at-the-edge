const express = require('express')
const router = express.Router()

function requestRouter ({ requestRepository }) {
  router.get('/join/:groupId', async (req, res) => {
    const userId = req.session.passport.user
    await requestRepository.addJoinRequest(userId, req.params.groupId)
    // res.send(request)
  })
  return router
}

module.exports = requestRouter
