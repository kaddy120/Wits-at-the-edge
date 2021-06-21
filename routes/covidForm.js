const express = require('express')
const router = express.Router()
const userResponse = require('../models/covidResponse')
router.get('/covidForm/:notificatonId', function (req, res, next) {
  res.render('covidForm', { title: 'Covid 19 Compliance Form', notificationId: req.params.notificatonId })
})
router.post('/covidForm/:notificatonId', (req, res, next) => {
  const response = userResponse.covidResponse(req.body)
  if (response === 'true') {
    alert('You are not attending the meeting due to the high risk of covid as per answers on the  covid form!!!!')
    res.redirect(`/meetings/${req.params.notificatonId}/unAvailable`)
  } else if (response === 'false') {
    res.redirect(`/meetings/${req.params.notificatonId}/Available`)
  } else {
    res.send(404, 'You did not complete the form wena heban')
  }
})
module.exports = router
