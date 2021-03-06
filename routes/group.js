'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const groupRepository = container.resolve('groupRepository')
const votesRepository = container.resolve('votesRepository')
const model = require('../models/voteValidation')
const group = require('../db/groups')
const engine = container.resolve('recommendationEngine')
const users = container.resolve('userRepository')
const groupCreator = require('../models/groupDetails')
const verify = require('../models/verification')
const multer = require('multer')
const { memoryStorage } = require('multer')
const upload = multer({ storage: memoryStorage() })
const imageSaver = require('../models/saveImagesToCloud')
const voteManager = require('../controllers/voteManager')
const defaultThumbnail = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png'
const authorization = container.resolve('authorization')
const score = require('../models/score')
const constants = require('../constants')
// const authorization = container.resolve('authorization')

// router.get('/dashboard', async (req, res) => {
//   const user = req.user
//   const groups = await groupRepository.getUserGroups(user.email)
//   const groupThumbnail = await groupRepository.getGroupThumbnail(user.email).then(result => { return result.recordset })
//   const thumbnail = []
//   for (let index = 0; index < groupThumbnail.length; index++) {
//     if (groupThumbnail[index].thumbnail == null) { thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png' } else thumbnail[index] = groupThumbnail[index].thumbnail
//   }
//   res.render('dashboard', { title: 'Dashboard', userGroups: groups, groupIcon: thumbnail })
// })
router.get('/dashboard', async (req, res) => {
  const user = req.user
  const groups = await groupRepository.getUserGroups(user.email)
  const groupThumbnail = await groupRepository.getGroupThumbnail(user.email).then(result => { return result.recordset })
  const thumbnail = []
  for (let index = 0; index < groupThumbnail.length; index++) {
    if (groupThumbnail[index].thumbnail == null) { thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png' } else thumbnail[index] = groupThumbnail[index].thumbnail
  }
  const userScore = await score.getScore(user.email)
  res.render('dashboard', { title: 'Dashboard', userGroups: groups, groupIcon: thumbnail, userScore: userScore })
})

router.get('/:groupId/members', async (req, res) => {
  const terminatingUser = req.user

  const members = await groupRepository.getGroupMembers(req.params.groupId, terminatingUser)
  console.log(members)
  for (let i = 0; i < members.length; i++) { members[i].score = await score.getScore(members[i].email) }

  console.log(members)
  res.render('groupMembers', { title: 'Group Members', members: members, groupId: req.params.groupId, terminator: terminatingUser })
})

router.get('/:groupId/:email/:firstName/:surname', async (req, res) => {
  const terminator = req.user
  console.log(terminator)
  const groupId = req.params.groupId

  res.render('members', { title: `${req.params.firstName} ${req.params.surname}`, email: req.params.email, terminator: terminator.email, groupId })
})

function sanitizeThumbnail (group_) {
  const result = group_.map(group => {
    if (group.thumbnail == null || group.thumbnail.length < 25) {
      group.thumbnail = defaultThumbnail
    }
    return group
  })
  return result
}

// router.post('/:groupId/terminate/:user/:terminator/:reason', async (req, res) => {
//   await groupRepository.terminateRequest(req.params.reason, req.params.user, req.params.terminator, req.params.groupId)
// })

router.post('/search', async function (req, res) {
  const userId = req.session.passport.user
  const groupName = req.body.groupName
  const results = await groupRepository.searchGroupByName(groupName, userId)
  if (results) {
    const groups = sanitizeThumbnail(results)
    res.render('groups', { title: 'Discover more groups to join', groups })
    return
  }
  res.render('groups', { title: 'Discover more groups to join', groups: [] })
})

router.get('/all/:pageNo', async (req, res) => {
  const groupsPerPage = 10
  const offset = groupsPerPage * (req.params.pageNo - 1)
  const userId = req.session.passport.user
  let recommendations = []
  if (req.user) {
    recommendations = await engine.recommendGroups(req.user)
    recommendations = sanitizeThumbnail(recommendations)
  }
  // const userId = 'test@gmail.com'
  let groups = await groupRepository.firstTop(offset, groupsPerPage, userId)
  if (groups.length > 0) {
    groups = sanitizeThumbnail(groups)
  }
  res.render('groups', { title: 'Discover more groups to join', groups, recommendations, userId })
})

// from here, it is for signed in users only
router.use(authorization.signedinUsers)

// from here, it is for signed in users only
// router.use(authorization.signedinUsers)

// what group are you terminating

// you atleast need to be signed in to access the following endpoint

// what group are you terminating

// you atleast need to be signed in to access the following endpoint
router.get('/createGroup', function (req, res, next) {
  res.render('createGroup', constants)
})

router.post('/createGroup', upload.single('thumbnail'), body('groupName', 'Group name cant be empty').notEmpty(),
  body('school', 'school name cant be empty').notEmpty(),
  body('yearOfStudy', 'yearOfStudy name cant be empty').notEmpty(),
  async function (req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const email = req.user.email
    const imageUrl = await imageSaver(req.file)
    const found = await groupRepository.userIsRegistered(email)
    if (found) {
      const groups = await groupRepository.getNumberOfGroups(email)
      if (verify.canCreateGroup(groups)) {
        const creater = new groupCreator(req.body.groupName, req.user.email, req.body.school, req.body.yearOfStudy, imageUrl)
        groupRepository.addingGroup(creater)
        const allgroups = await groupRepository.getNumberOfGroups(email)
        groupRepository.addFirstMember(allgroups[allgroups.length - 1].groupId, allgroups[allgroups.length - 1].adminId)
        res.redirect(`/group/${allgroups[allgroups.length - 1].groupId}`)
      } else {
        res.redirect('/')
      }
    } else {
      res.redirect('/signup')
    }
  })
router.get('/:groupId', async (req, res) => {
  const groupName = await groupRepository.getUserGroupName(req.params.groupId)
  res.render('groupHomePage', { title: 'Group Home Page', groupName: groupName[0].groupName, groupId: req.params.groupId })
})
// the following actions can only be perfomed by group members
// router.get('/:groupId/*', authorization.groupMembers)
// router.post('/:groupId/*', authorization.groupMembers)

// router.get('/:groupId', async (req, res) => {
//   const groupName = await groupRepository.getUserGroupName(req.params.groupId)
//   res.render('groupHomePage', { title: 'Group Home Page', groupName: groupName[0].groupName, groupId: req.params.groupId })
// })

// router.get('/:groupId/members', async (req, res) => {
//   const terminatingUser = req.user
//   const members = await groupRepository.getGroupMembers(req.params.groupId)
//   console.log(members)
//   const profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU'
//   res.render('members', { title: 'Group Members', members: members, image: profile, groupId: req.params.groupId, terminator: terminatingUser })
// })

router.post('/:groupId/terminate/:user/:terminator/:reason', async (req, res) => {
  const terminatee = req.params.user
  const terminateReason = req.params.reason
  const terminator = req.params.terminator
  await groupRepository.terminateRequest(terminateReason, terminatee, terminator)
  console.log(terminateReason)
})

router.get('/:groupId/createMeeting', async (req, res) => {
  res.render('createMeeting', { groupId: req.params.groupId })
})

router.post('/:groupId/createMeeting',
  body('aganda', 'Agenda cannot be empy').notEmpty(),
  body('time', 'time can not be null').notEmpty(),
  async (req, res) => {
    // for now just give it any id
    const error = validationResult(req)
    if (error.array().length > 0) {
      res.redirect(400, '/group/createMeeting')
    }

    const email = req.user.email
    const groupId = req.params.groupId

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

// this should be group/groupId/chat
router.get('/:groupId/chat', (req, res) => {
  res.render('chat', { roomname: req.params.groupId })
})

router.get(':groupId/exit', (req, res) => {
  const userDetails = { ...req.body }
  userDetails.userId = req.user.email
  userDetails.groupId = req.params.groupId
  // logging
  users.addTracking(userDetails.userId, 'exitGroup', userDetails.groupId)
  group.exitUserGroup(userDetails)
  res.redirect('/dashboard')
})

module.exports = router
