
const utils = require('../utils')
const { sql } = require('../../db')

class LinksRository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }

  // title, linkURL, topicId, timePosted, userId, groupId
  async addLink (link) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('links')
      const result = await pool.request()
        .input('groupId', sql.Int, link.groupId)
        .input('linkURL', sql.VarChar(300), link.linkURL)
        .input('userId', sql.VarChar(60), link.userId)
        .input('title', sql.VarChar(200), link.title)
        .input('topicId', sql.Int, link.topicId)
        .input('timePosted', sql.DateTime, link.timePosted)
        .query(sqlQueries.addLink)
      return result.recordset[0]
    } catch (err) {
      console.log(err)
    }
  }

  // topic, topicid, time, timeCreated, groupId, userId
  async addTopic (topic) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('links')
      const topicId = await pool.request()
        .input('groupId', sql.Int, topic.groupId)
        .input('userId', sql.VarChar(50), topic.userId)
        .input('topic', sql.VarChar(100), topic.topic)
        .input('timeCreated', sql.DateTime, topic.timeCreated)
        .query(sqlQueries.addTopic)
      return topicId.recordset[0]
    } catch (err) {
      console.log(err)
    }
  }

  async links (groupId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('links')
      const Links = await pool.request()
        .input('groupId', sql.Int, groupId)
        .query(sqlQueries.links)
      return Links.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async link (linkId) {
    try {
      const pool = await this.dbpool
      const Links = await pool.request()
        .query(`Select * from Links where linkId = ${linkId}`)
      return (Links.recordset)[0]
    } catch (err) {
      console.log(err)
    }
  }

  // update topic
  async updateLink (link) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('links')
      const updateLink_ = await pool.request()
        // .input('title', sql.VarChar(200), link.title)
        // .input('linkURL', sql.VarChar(200), link.linkURL)
        // .input('linkId', sql.Int, link.linkId)
        .query(`UPDATE dbo.[Links]  
           SET linkURL = '${link.linkURL}', title = '${link.title}'
           OUTPUT INSERTED.*
           WHERE linkId = ${link.linkId}`)
      return (updateLink_.recordset)[0]
    } catch (err) {
      console.log(err)
    }
  }

  // update link
  async updateTopic (topic) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const Links = await pool.request()
        .input('groupId', sql.Int, topic.topicId)
        .query(`UPDATE dbo.[LinkTopic]  
        SET title = ${topic.title}  
        WHERE topicId = ${topic.topicId};`)
      return Links.recordset
    } catch (err) {
      console.log(err)
    }
  }

  // only a user who posted the link can remove the link
  async removeLink (linkId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      await pool.request()
        .query(`DELETE FROM Links where linkId = ${linkId}`)
    } catch (err) {
      console.log(err)
    }
  }

  async adminRemoveLink (linkId) {
    try {
      const pool = await this.dbpool
      await pool.request()
        .input('linkId', sql.Int, linkId)
        .query(`Delete from [dbo].Links where linkId = ${linkId}`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = LinksRository
