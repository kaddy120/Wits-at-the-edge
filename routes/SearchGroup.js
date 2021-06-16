'use strict'
const express = require('express')
const router = express.Router()
const Search = require('../db/groups/index')
// const joinProcess = require('../db/joinGroup/joinGroupRequest')


router.get('/groupName/:groupId', async (req, res) => {
  const user = req.user
  const groupId = req.params.groupId
  requests.email = user.email
  requests.groupId = groupId
  // await joinProcess.addJoinRequest(requests)
  // res.send(`${groupName} group home page`)
})

module.exports = router
