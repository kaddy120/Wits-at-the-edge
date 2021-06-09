'use strict'
const express = require('express')
const router = express.Router()
const Search = require('../db/groups/index')
// const joinProcess = require('../db/joinGroup/joinGroupRequest')
const requests = {
  email: '',
  groupId: 0

}

router.get('/searchGroup', function (req, res, next) {
  res.render('searchGroup', { title: 'Search Group Page' })
})

router.post('/searchGroup', async function (req, res, next) {
  try {
    const groupName = req.body.groupName
    const groups = await Search.getGroupName(groupName)
    if (groups !== 0) {
      const thumbnail = []
      for (let index = 0; index < groups.length; index++) {
        if (groups[index].thumbnail == null) { thumbnail[index] = 'https://www.seekpng.com/png/detail/215-2156215_diversity-people-in-group-icon.png' } else thumbnail[index] = groups[index].thumbnail
      }
      res.render('searchResults', { title: 'Group Search results', userGroups: groups, groupIcon: thumbnail })
    } else res.render('searchGroups', { title: 'Group Search results', userGroups: 'Not found' })
  } catch (err) {
    console.log(err)
  }
})

router.get('/groupName/:groupId', async (req, res) => {
  const user = req.user
  const groupId = req.params.groupId
  requests.email = user.email
  requests.groupId = groupId
  // await joinProcess.addJoinRequest(requests)
  // res.send(`${groupName} group home page`)
})

module.exports = router
