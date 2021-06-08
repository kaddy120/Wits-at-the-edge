'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

function meetingRouters ({ groupRepository }) {
  router.get('/', async (req, res) => {
    res.render('group')
  })

  router.get('/dashboard', async (req, res) => {
    const user = req.user  
    const groups = await groupRepository.getUserGroups(user.email).then(result => {return result.recordset})
    //*console.log("groups", groups[0].groupName)*//
      res.render('dashboard', {title: 'Dashboard', userGroups: groups})
  })

  router.get('/groupHomepage', async (req, res) => {
     res.render('Group home page')
  })

  router.get('/create', async (req, res) => {
    res.render('createMeeting')
  })

  router.post('/create',
    body('agenda', 'Agenda cannot be empy').notEmpty(),
    body('time', 'time can not be null').notEmpty(),
    async (req, res) => {
    // for now just give it any id
      const error = validationResult(req)
      if (error.array().length > 0) {
        res.redirect(400, '/meeting/create')
      }

      const email = 'kaddy120@gmail.com'
      const groupId = 2

      if (await groupRepository.userIsMember(email, groupId)) {
        const meeting = { ...req.body }
        meeting.userId = email
        meeting.groupId = groupId
        await groupRepository.createMeeting(meeting)
        res.redirect('/group')
      } else {
        res.status(404).json({ message: 'you are not a group member, you cannot create a meeting' })
      }
    })
  return router
}
module.exports = { meetingRouters }
