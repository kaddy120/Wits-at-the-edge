const express = require('express')
const router = express.Router()
const userResponse = require('../models/covidResponse')
router.get('/covidForm/:notificatonId', function (req, res, next) {
  res.render('covidForm', { title: 'Covid 19 Compliance Form', notificationId: req.params.notificatonId })
})
router.post('/covidForm/:notificatonId', (req, res, next) => {
  const response = userResponse.covidResponse(req.body)
  if (response === 'true') {
    res.redirect(`/meetings/${req.params.notificatonId}/risky`)
  } else if (response === 'false') {
    res.redirect(`/meetings/${req.params.notificatonId}/Available`)
  } else {
    res.send(404, 'You did not complete the form wena heban')
  }
})
module.exports = router
