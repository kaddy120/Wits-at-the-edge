'use strict'
const express = require('express')
const { body } = require('express-validator')
// const { body, validationResult } = require('express-validator')
const router = express.Router()

function linkRouters ({ linkRepository }) {
  router.get('/links/:groupId', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', { links })
  })

  router.post('/link', async (req, res) => {
    const link = { ...req.body }
    link.timePosted = new Date().toISOString().slice(0, 19).replace('T', ' ')
    link.userId = req.user.email
    const linkId = await linkRepository.addLink(link)
    res.status(201).send(linkId)
  })

  // i will need to validate the input
  router.post('/topic', async (req, res) => {
    const groupId = req.params.groupId
    const topic = { ...req.body }
    topic.userId = req.user.email
    topic.timeCreated = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const result = await linkRepository.addTopic(topic)
    res.satus(201).send(result)
  })

  // the person who created a link can delete it
  router.delete('/link/:linkId', async (req, res) => {
    const link = await linkRepository.link(req.params.linkId)
    if (!link) {
      return res.status(404).json({})
    }
    if (link.userId !== req.user.email) {
      return res.status(403).json({})
    } else {
      // more appropriate is 204 but for simplicity i will go with 200
      linkRepository.removeLink(req.params.linkId)
      return res.status(200).json({})
    }
  }
  )

  router.put('/link/:linkId', async (req, res) => {
    const link = await linkRepository.link(req.params.linkId)
    if (link.userId !== req.user.email) {
      return res.status(403).json({})
    } else {
      const groupId = req.params.groupId
      // i don't think i need to await anything here
      link.title = req.body.title
      link.linkURL = req.body.linkURL
      const newLink = await linkRepository.updateLink(link)
      res.status(200).json(newLink)
      // res.render('links', newLink)
    }
  })
  // the person who created a link can delete it
  router.delete('/topic/:topicId', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', links)
  })

  router.put('/topic', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', links)
  })

  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())
  return router
}
module.exports = { linkRouters }
