'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

function meetingRouters ({ groupRepository, meetingRepository, userRepository }) {
  router.get('/', async (req, res) => {
    res.render('group')
  })

  router.get('/groupName/:groupId', async (req, res) => {
    const groupName = req.params.groupId
    res.send(`${groupName} group home page`)
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

      const email = 'finalTest@gmail.com'
      const groupId = 58

      if (await groupRepository.userIsMember(email, groupId)) {
        const meeting = { ...req.body }
        meeting.userId = email
        meeting.groupId = groupId
        if (!meeting.address) {
          meeting.address = null
        }
        const userMeeting = await groupRepository.createMeeting(meeting)
        userRepository.addTracking(meeting.userId, 'createMeating', meeting.groupId) // added this but not working
        const groupMembers = await meetingRepository.getGroupMembers(groupId)
        for (let i = 0; i < groupMembers.length; i++) {
          await meetingRepository.addMeetings(groupMembers[i], userMeeting[0].meetingId)
        }

        res.redirect('/')
      } else {
        res.status(404).json({ message: 'you are not a group member, you cannot create a meeting' })
      }
    })

  router.get('/response', async (req, res, next) => {
    const user = 'finalTest@gmail.com'
    const getNotifications = await meetingRepository.getAllUserNotifications(user)
    const meetings = []
    const groupNames = []
    for (let x = 0; x < getNotifications.length; x++) {
      const meeting = await meetingRepository.getAllUserMeetings(getNotifications[x].meetingId)
      const groupName = await groupRepository.getUserGroupName(meeting[0].groupId)
      meetings.push(meeting[0])
      groupNames.push(groupName[0])
    }

    res.render('response', { title: 'Respond To a meeting', userMeetings: meetings, groupNames: groupNames, user: user, notifications: getNotifications })
  })

  router.get('/meetings/:notificationId/:response', async (req, res, next) => {
    const notificationId = req.params.notificationId
    const response = req.params.response
    if (response === 'Available') {
      await meetingRepository.updateNotification(notificationId, 1)
    } else if (response === 'risky') {
      await meetingRepository.updateNotification(notificationId, 2)
    } else {
      await meetingRepository.updateNotification(notificationId, -1)
    }

    res.redirect('/meeting/response')
  })

  return router
}
module.exports = { meetingRouters }
