const express = require('express')
const { authorization } = require('../middleware/authorization')
const router = express.Router()
router.use(authorization)

function requestRouter ({ requestRepository }) {
  router.get('/join/:groupId', async (req, res) => {
    const userId = req.session.passport.user
    await requestRepository.addJoinRequest(userId, req.params.groupId)
    return res.sendStatus(200)
  })
  return router
}

module.exports = requestRouter
