'use strict'
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const createGroups = container.resolve('groupRepository')
const group = require('../db/groups')
const groupCreator = require('../models/groupDetails')
const verify = require('../models/verification')
const multer = require('multer')
const { memoryStorage } = require('multer')
const upload = multer({ storage: memoryStorage() })
const imageSaver = require('../models/saveImagesToCloud')

router.get('/', async (req, res) => {
  res.render('group')
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
    const found = await createGroups.userIsRegistered(email)
    if (found) {
      const groups = await createGroups.getNumberOfGroups(email).then((data) => {
        return data.recordset
      })
      if (verify.canCreateGroup(groups)) {
        const creater = new groupCreator(req.body.groupName, req.body.adminId, req.body.school, imageUrl)
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
