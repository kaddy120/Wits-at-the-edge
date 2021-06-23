'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const groupRepository = container.resolve('groupRepository')
const group = require('../db/groups')
const deletUserGroups = container.resolve('groupRepository')
const engine = container.resolve('recommendationEngine')
const groupCreator = require('../models/groupDetails')
const verify = require('../models/verification')
const multer = require('multer')
const { memoryStorage } = require('multer')
const upload = multer({ storage: memoryStorage() })
const imageSaver = require('../models/saveImagesToCloud')
const defaultThumbnail = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png'

router.get('/dashboard', async (req, res) => {
  const user = req.user
  const groups = await groupRepository.getUserGroups(user.email).then(result => { return result.recordset })
  const groupThumbnail = await groupRepository.getGroupThumbnail(user.email).then(result => { return result.recordset })
  console.log(groups)
  const thumbnail = []
  for (let index = 0; index < groupThumbnail.length; index++) {
    if (groupThumbnail[index].thumbnail == null) { thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png' } else thumbnail[index] = groupThumbnail[index].thumbnail
  }

  res.render('dashboard', { title: 'Dashboard', userGroups: groups, groupIcon: thumbnail })
})

router.get('/:groupId', async (req, res) => {
  const groupName = await groupRepository.getUserGroupName(req.params.groupId)
  console.log(groupName)
  res.render('groupHomePage', { title: 'Group Home Page', groupName: groupName[0].groupName, groupId: req.params.groupId })
})

router.get('/all/:pageNo', async (req, res) => {
  const groupsPerPage = 10
  const offset = groupsPerPage * (req.params.pageNo - 1)
  const userId = req.session.passport.user
  let recommendations = []
  if (req.user) {
    recommendations = await engine.recommendGroups(req.user)
  }
  // const userId = 'test@gmail.com'
  const groups = await groupRepository.firstTop(offset, groupsPerPage, userId)
  res.render('groups', { title: 'Discover more groups to join', groups, recommendations })
})

router.post('/search', async function (req, res) {
  const userId = req.session.passport.user
  const groupName = req.body.groupName
  const results = await groupRepository.searchGroupByName(groupName, userId)
  if (results.length > 0) {
    const groups = results.map(group => {
      if (group.thumbnail == null || group.thumbnail.length < 15) {
        group.thumbnail = defaultThumbnail
      }
      return group
    })
    res.render('groups', { title: 'Discover more groups to join', groups })
    return
  }
  res.render('groups', { title: 'Discover more groups to join', groups: [] })
})

router.get('/createMeeting', async (req, res) => {
  res.render('createMeeting')
})

router.get('/chat/:groupId', (req, res) => {
  res.render('chat', { roomname: req.params.groupId })
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

router.post('/createGroup', body('groupName', 'Group name cant be empty').notEmpty(),
  body('school', 'school name cant be empty').notEmpty()
  , upload.single('thumbnail'), async function (req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const email = req.body.adminId
    const imageUrl = await imageSaver(req.file)
    const found = await groupRepository.userIsRegistered(email)
    if (found) {
      const groups = await groupRepository.getNumberOfGroups(email).then((data) => {
        return data.recordset
      })
      if (verify.canCreateGroup(groups)) {
        const creater = new groupCreator(req.body.groupName, req.body.adminId, req.body.school, imageUrl)
        groupRepository.addingGroup(creater)
        const allgroups = await groupRepository.getNumberOfGroups(email).then((data) => {
          return data.recordset
        })

        groupRepository.addFirstMember(allgroups[allgroups.length - 1].groupId, allgroups[allgroups.length - 1].adminId)
        res.redirect('/group')
      } else {
        res.redirect('/group')
      }
    } else {
      res.redirect('/signup')
    }
  })

router.get('/deleteUser', (req, res) => {
  const groupId = 2
  const email = 'kaddy122@gmail.com'

  const userDetails = { ...req.body }
  userDetails.userId = email
  userDetails.groupId = groupId
  deletUserGroups.exitUserGroup(userDetails)
  res.redirect('/dashboard')
})

module.exports = router
