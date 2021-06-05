'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const createGroups = container.resolve('createGroup')
const group = require('../db/groups')
const groupCreator = require('../models/groupDetails')
const verify = require('../models/verification')
router.get('/', async (req, res) => {
  res.render('group')
})

router.get('/createMeeting', async (req, res) => {
  res.render('createMeeting')
})

router.post('/createMeeting',
  body('aganda', 'Agenda cannot be empy').notEmpty(),
  body('time', 'time can not be null').notEmpty(),
  async (req, res) => {
    // for now just give it any id
    const error = validationResult(req)
    if (error.array().length > 0) {
      res.redirect(400, '/group/createMeeting')
    }

    const email = 'kaddy120@gmail.com'
    const groupId = 2

    if (await group.userIsMember(email, groupId)) {
      const meeting = { ...req.body }
      meeting.userId = email
      meeting.groupId = groupId
      await group.createMeeting(meeting)
      res.redirect('/group')
    } else {
      res.status(404).json({ message: 'you are not a group member, you cannot create a meeting' })
    }
  })

router.get('/createGroup', function (req, res, next) {
  res.render('createGroup', { title: 'Create Group Page' })
})

router.post('/createGroup', async function (req, res, next) {
  const email = req.body.adminId

  const found = await createGroups.userIsRegistered(email)
  console.log(`found: ${found}`)
  if (found) {
    const groups = await createGroups.getNumberOfGroups(email).then((data) => {
      return data.recordset
    })
    if (verify.canCreateGroup(groups)) {
      const creater = new groupCreator(req.body.groupName, req.body.adminId, req.body.school, req.body.thumbnail)
      createGroups.addingGroup(creater)
      const allgroups = await createGroups.getNumberOfGroups(email).then((data) => {
        return data.recordset
      })
      createGroups.addFirstMember(allgroups[allgroups.length - 1].groupId, allgroups[allgroups.length - 1].adminId)
      res.redirect('/group')
    } else {
      res.redirect('/group')
    }
  } else {
    res.redirect('/signup')
  }
})
module.exports = router
