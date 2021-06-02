'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const group = require('../db/groups')

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
module.exports = router
