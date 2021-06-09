'use strict'
const express = require('express')
const router = express.Router()
const Search = require('../db/groups/index')

router.get('/searchGroup', function (req, res, next) {
  res.render('searchGroup', { title: 'Search Group Page' })
})

router.post('/searchGroup', async function (req, res, next) {
  try {
    const groupName = req.body.groupName
    const groups = await Search.getGroupName(groupName)
    res.render('searchGroups', { title: 'Group Search results', groups: groups })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
