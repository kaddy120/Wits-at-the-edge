'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

function meetingRouters ({ groupRepository, meetingRepository }) {
  router.get('/', async (req, res) => {
    res.render('group')
  })

  router.get('/dashboard', async (req, res) => {
    const user = req.user
    const groups = await groupRepository.getUserGroups(user.email).then(result => { return result.recordset })
    const groupThumbnail = await groupRepository.getGroupThumbnail(user.email).then(result => { return result.recordset })

    const thumbnail = []
    for (let index = 0; index < groupThumbnail.length; index++) {
      if (groupThumbnail[index].thumbnail == null) { thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png' } else thumbnail[index] = groupThumbnail[index].thumbnail
    }

    res.render('dashboard', { title: 'Dashboard', userGroups: groups, groupIcon: thumbnail })
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

      const email = 'kaddy120@gmail.com'
      const groupId = 2

      if (await groupRepository.userIsMember(email, groupId)) {
        const meeting = { ...req.body }
        meeting.userId = email
        meeting.groupId = groupId
        console.log(meeting)
        const userMeeting = await groupRepository.createMeeting(meeting)
        const groupMembers = await meetingRepository.getGroupMembers(groupId)
        for (let i = 0; i < groupMembers.length; i++) {
          await meetingRepository.addMeetings(groupMembers[i], userMeeting[0].meetingId)
        }
        res.redirect('/group')
      } else {
        res.status(404).json({ message: 'you are not a group member, you cannot create a meeting' })
      }
    })

  router.get('/response', async (req, res, next) => {
    const user = 'kaddy120@gmail.com'
    const getNotifications = await meetingRepository.getAllUserNotifications(user)
    const meetings = []
    const groupNames = []
    console.log(getNotifications)
    for (let x = 0; x < getNotifications.length; x++) {
      const meeting = await meetingRepository.getAllUserMeetings(getNotifications[x].meetingId)
      const groupName = await groupRepository.getUserGroupName(getNotifications[x].meetingId)
      meetings.push(meeting[0])
      groupNames.push(groupName[0])
    }

    res.render('response', { title: 'Respond To a meeting', userMeetings: meetings, groupNames: groupNames, user: user, notifications: getNotifications })
  })

  router.get('/meetings/:notificationId/:response', async (req, res, next) => {
    const notificationId = req.params.notificationId
    const response = req.params.response
    if (response === 'Available') {
      console.log('available')
      await meetingRepository.updateNotification(notificationId, 1)
    } else {
      await meetingRepository.updateNotification(notificationId, -1)
    }

    res.redirect('/meeting/response')
  })

  return router
}
module.exports = { meetingRouters }
