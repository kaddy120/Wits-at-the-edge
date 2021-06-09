'use strict'
const express = require('express')
const router = express.Router()
const Search = require('../db/groups/index')

router.get('/searchGroup', function (req, res, next) {
  res.render('searchGroup', { title: 'Search Group Page' })
})

router.post('/searchGroup', async function (req, res, next) {
  try {
    const user = req.user
    const groupName = req.body.groupName
    const groups = await Search.getGroupName(groupName)
    if (groups !== 0) {
      const thumbnail = []
      for (let index = 0; index < groups.length; index++) {
        thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png'
      }
      res.render('searchResults', { title: 'Group Search results', userGroups: groups, groupIcon: thumbnail })
    } else res.render('searchGroups', { title: 'Group Search results', userGroups: 'Not found' })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
