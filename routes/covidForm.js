const express = require('express')
const router = express.Router()

router.get('/covidForm', function (req, res, next) {
  res.render('covidForm', { title: 'Covid 19 Compliance Form' })
})

module.exports = router
