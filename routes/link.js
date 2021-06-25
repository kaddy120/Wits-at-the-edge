'use strict'
const express = require('express')
// const { body, validationResult } = require('express-validator')
const router = express.Router()

function linkRouters ({ linkRepository }) {
  router.get('/links/:groupId', async (req, res) => {
    const groupId = req.params.groupId
    // const links = await linkRepository.links(groupId)
    res.render('links')
  })
  return router
}
module.exports = { linkRouters }
