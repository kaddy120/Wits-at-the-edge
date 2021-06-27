'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const groupRepository = container.resolve('groupRepository')
const votesRepository = container.resolve('votesRepository')
const model = require('../models/voteValidation')
const group = require('../db/groups')
const deletUserGroups = container.resolve('groupRepository')
const engine = container.resolve('recommendationEngine')
const users = container.resolve('userRepository')
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

router.get('/members/:groupId', async (req, res) => {
  const terminatingUser = req.user
  const members = await groupRepository.getGroupMembers(req.params.groupId).then(result => { return result.recordset })
  console.log(members)
  const profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU'
  res.render('members', { title: 'Group Members', members: members, image: profile, groupId: req.params.groupId, terminator: terminatingUser })
})

router.post('/terminate/:user/:terminator/:reason', async (req, res) => {
  const terminatee = req.params.user
  const terminateReason = req.params.reason
  const terminator = req.params.terminator
  await groupRepository.terminateRequest(terminateReason, terminatee, terminator)
  console.log(terminateReason)
})

router.get('/notifications/:groupId', async (req, res) => {
  const info = await groupRepository.terminateNotification().then(result => { return result.recordset })
  console.log(info[0].memberToBeTerminated)
  console.log(req.user.email)
  res.render('notifications', { title: 'notifications', user: info, logged: req.user.email, groupId: req.params.groupId })
})

router.post('/vote/:groupId/:requestId/:email/:voteChoice', async (req, res) => {
  const requestId = req.params.requestId
  const voter = req.params.email
  const choice = req.params.voteChoice
  const groupId = req.params.groupId
  await votesRepository.terminationVote(requestId, voter, choice)
  const getNumOfGroupMembers = await votesRepository.getNumOfGroupMembers(req.params.groupId)
  const voteCount = await votesRepository.CountVotes(requestId).then(result => { return result.recordset })
  console.log(voteCount)
  const counter = model.countVotes(voteCount, getNumOfGroupMembers)
  console.log(counter)
  const member = await votesRepository.getMemberToBeTerminated(requestId).then(result => { return result.recordset })
  console.log(member[0].memberToBeTerminated)
  if (counter === true) { await votesRepository.deleteMember(member[0].memberToBeTerminated, groupId) }
  res.send('OK')
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
      users.addTracking(meeting.userId, 'createMeating', meeting.groupId)
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
  users.addTracking(userDetails.userId, 'exitGroup', userDetails.groupId)
  deletUserGroups.exitUserGroup(userDetails)
  res.redirect('/dashboard')
})

module.exports = router
