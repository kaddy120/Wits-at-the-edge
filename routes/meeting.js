'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const moment = require('moment')

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

      const email = 'mullertest23@gmail.com'
      const groupId = 80

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
    const user = req.user.email
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

  router.get('/trackUser', async (req, res, next) => {
    const user = req.user.email
    const attendedMeetings = await meetingRepository.getAttendedMeetings(user)
    const filteredMeetings = attendedMeetings.filter((meeting) => {
      const duration = moment.duration(moment(new Date()).diff(meeting.meetingTime))
      const minutes = duration.asMinutes()
      return minutes >= 40
    })
    res.render('trackLocation', { title: 'Track Users', meetings: filteredMeetings })
  })
  router.post('/meetingFinished/:meetingId/:finishTime', async (req, res, next) => {
    const meetingId = req.params.meetingId
    const finishTime = req.params.finishTime
    const user = req.user.email
    const users = await meetingRepository.getNotificationMember(user, meetingId)
    for (let i = 0; i < users.length; i++) {
      meetingRepository.setFinishTime(users[i].userId[0], meetingId, finishTime, null)
      const agenda = 'Please do not log out of the app for tracking to be effective'
      meetingRepository.sendEmail(users[i].userId[0], agenda)
    }
    res.send({ meeting: 'Updated' })
  })

  router.get('/sendEmail', async (req, res, next) => {
    const user = 'mullertest23@gmail.com'
    meetingRepository.sendEmail(user)
    res.send('message went')
  })
  router.get('/calculateDistance', async (req, res, next) => {
    const user = req.user.email
    const userAddressDetails = await meetingRepository.getUserAddress(user)

    res.render('userTracker', { userId: user, meetingId: userAddressDetails[0].meetingId, lat: userAddressDetails[0].lat, long: userAddressDetails[0].long })
  })
  router.post('/updateUserDistance/:meetingId/:distance', async (req, res, next) => {
    const user = req.user.email
    const distance = req.params.distance
    const meetingId = req.params.meetingId
    await meetingRepository.updateDistance(user, meetingId, distance)
    res.send({ distance: 'updated' })
  })
  return router
}
module.exports = { meetingRouters }
