'use strict'
const express = require('express')
const router = express.Router()
const grouping = require('../db/createGroup/createGroup')
const GroupCreator = require('../models/groupDetails')
const verify = require('../models/verification')

router.get('/createGroup', function (req, res, next) {
  res.render('createGroup', { title: 'Create Group Page' })
})

router.post('/createGroup', async function (req, res, next) {
  const email = req.body.adminId
  const found = await grouping.getUserEmails(email).then((data) => {
    return data.recordset
  })
  if (verify.userFound(found, email)) {
    const groups = await grouping.getNumberOfGroups(email).then((data) => {
      return data.recordset
    })
    if (verify.canCreateGroup(groups)) {
      const creater = new GroupCreator(req.body.groupName, req.body.adminId, req.body.school, req.body.thumbnail)
      grouping.addingGroup(creater)
      const allgroups = await grouping.getNumberOfGroups(email).then((data) => {
        return data.recordset
      })
      grouping.addFirstMember(allgroups[allgroups.length - 1].groupId, allgroups[allgroups.length - 1].adminId)
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/signup')
  }
})
module.exports = router
