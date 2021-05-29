const express = require('express')
const router = express.Router()
const users = require('../db/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  users.getUsers().then(usersList => {
    console.log(usersList)
    res.render('index')
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router
