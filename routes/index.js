const express = require('express')
const score = require('../models/score')
const router = express.Router()
/* GET home page. */
router.get('/', async function (req, res, next) {
  const user = req.user
  const userScore = await score.getScore(user.email)
  res.render('index', { title: 'Express', userScore: userScore })
})

module.exports = router
