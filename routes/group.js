'use strict'
const express = require('express')
const router = express.Router()
const Grouping = require('../db/CreateGroup/Group')
const GroupCreater = require('../models/Creater')
const Verify = require('../models/Verification')

router.get('/group', function (req, res, next) {
  res.render('group', { title: 'Create Group Page' })
})

router.post('/group', async function (req, res, next) {
  const email = req.body.adminId
  const found = await Grouping.Validation(email).then((data) => {
    return data.recordset
  })
  if (Verify.Userfound(found, email)) {
    const groups = await Grouping.MaximumGroups(email).then((data) => {
      return data.recordset
    })
    if (Verify.CanCreateGroup(groups)) {
      const creater = new GroupCreater(req.body.GroupName, req.body.adminId, req.body.school, req.body.Thumbnail)
      Grouping.AddingGroup(creater)
      res.redirect('/')
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/signup')
  }
})
module.exports = router
