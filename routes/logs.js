const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { container } = require('../di-setup')
const users = container.resolve('userRepository')

router.post('/logs',
  body('userEmail', 'Agenda cannot be empy').notEmpty(),
  body('start', 'Start date can not be null').notEmpty(),
  body('end', 'End date can not be null').notEmpty(),
  async (req, res) => {
    // for now just give it any id
    const error = validationResult(req)
    if (error.array().length > 0) {
      res.redirect(400, '/logs')
    }

    const email = req.user.email
    const groupId = req.params.groupId

    const logger = { ...req.body }
    logger.userId = email
    logger.groupId = groupId
    await users.getUserLog(logger)
    res.redirect('/LogResults')
  })
