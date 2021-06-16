const express = require('express')
const router = express.Router()

router.get('/covidForm', function (req, res, next) {
  res.render('covidForm', { title: 'Covid 19 Compliance Form' })
})

router.get('../models/covid.js', function (req, res, next) {
  res.send('covid.js')
})

module.exports = router
