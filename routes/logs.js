const express = require('express')
const { body, validationResult } = require('express-validator')
const { render } = require('pug')
const router = express.Router()
const { container } = require('../di-setup')
const users = container.resolve('userRepository')

router.get('/logs', async (req, res, next) => {
  res.render('logs', { title: 'Search For User Logs' })
})
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

    const logger = { ...req.body }
    const logs = await users.getUserLog(logger)
    if (logger.end < logger.start) res.redirect(400, '/logs')
    else res.render('logResults', { title: 'Log Results', logs: logs })
  })

module.exports = router
