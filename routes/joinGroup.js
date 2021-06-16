const express = require('express')
const router = express.Router()
const users = require('../db/joinGroup/user.json')
const joinProcess = require('../joinGroup/joiningGroupRequest') // Check here
const model = require('../models/addRequest')

router.get('/joinRequest', async function (req, res) {
  const user = users.userOne
  const request = model.addARequest(user)
  await joinProcess.addJoinRequest(user).then(result => { return result.recordset })
  res.send(request)
})

module.exports = router
