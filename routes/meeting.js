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
    const groupThumbnail = await groupRepository.getGroupThumbnail(user.email).then(result => {return result.recordset})
  
    let thumbnail = []
    for(let index = 0;index < groupThumbnail.length;index++){
      if(groupThumbnail[index].thumbnail == null)
        thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png'
      else thumbnail[index] = groupThumbnail[index].thumbnail
    }
  
    res.render('dashboard', {title: 'Dashboard', userGroups: groups, groupIcon: thumbnail})
  })

  router.get('/groupName/:groupId', async (req, res) => {
     const groupName = req.params.groupId
     res.send( `${groupName} group home page`)
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
