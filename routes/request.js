const express = require('express')
const router = express.Router()

function requestRouter ({ requestRepository, authorization }) {
  router.use(authorization.signedinUsers)
  router.get('/join/:groupId', async (req, res) => {
    const userId = req.session.passport.user
    await requestRepository.addJoinRequest(userId, req.params.groupId)
    return res.sendStatus(200)
  })
  return router
}

module.exports = requestRouter
