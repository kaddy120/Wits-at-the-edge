'use strict'
const express = require('express')
const { body } = require('express-validator')
const { NotExtended } = require('http-errors')
// const { body, validationResult } = require('express-validator')
const router = express.Router()

function linkRouters ({ linkRepository }) {
  router.get('/:groupId/links/', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', { links, groupId, userId: req.params.email })
  })
  router.get('/:groupId/link/:linkId', async (req, res, next) => {
    const link = await linkRepository.link(req.params.linkId)
    if (link) {
      res.render('externalLink', link)
    } else {
      next()
    }
  })

  router.post('/:groupId/link', async (req, res) => {
    const link = { ...req.body }
    link.timePosted = new Date().toISOString().slice(0, 19).replace('T', ' ')
    link.userId = req.user.email
    const groupId = req.params.groupId
    const linkId = await linkRepository.addLink(link)
    const links = await linkRepository.links(groupId)
    res.render('links', { links, groupId, userId: req.params.email })
    // return res.status(200).send(linkId)
  })

  // i will need to validate the input
  router.post('/:groupId/topic', async (req, res) => {
    const groupId = req.params.groupId
    const topic = { ...req.body }
    topic.userId = req.user.email
    topic.timeCreated = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const result = await linkRepository.addTopic(topic)
    const links = await linkRepository.links(groupId)
    res.render('links', { links, groupId, userId: req.params.email })
  })

  // the person who created a link can delete it
  router.delete('/:groupId/link/:linkId', async (req, res) => {
    const link = await linkRepository.link(req.params.linkId)
    if (!link) {
      return res.status(404).json({})
    }
    if (link.userId !== req.user.email) {
      return res.status(403).json({})
    } else {
      // more appropriate is 204 but for simplicity i will go with 200
      linkRepository.removeLink(req.params.linkId)
      return res.status(201).json({})
    }
  }
  )

  router.post('/:groupId/link/:linkId', async (req, res) => {
    const link = await linkRepository.link(req.params.linkId)
    if (link.userId !== req.user.email) {
      return res.status(403).json({})
    } else {
      const groupId = req.params.groupId
      // i don't think i need to await anything here
      link.title = req.body.title
      link.linkURL = req.body.linkURL
      await linkRepository.updateLink(link)
      const links = await linkRepository.links(groupId)
      res.render('links', { links, groupId, userId: req.params.email })
      // res.render('links', newLink)
    }
  })
  // the person who created a link can delete it
  router.delete('/:groupId/topic/:topicId', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', links)
  })

  router.put('/:groupId/topic', async (req, res) => {
    const groupId = req.params.groupId
    const links = await linkRepository.links(groupId)
    res.render('links', links)
  })

  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())
  return router
}
module.exports = { linkRouters }
