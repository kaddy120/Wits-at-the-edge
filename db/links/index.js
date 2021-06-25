
const utils = require('../utils')
const { sql } = require('../../db')

class LinksRository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }

  async addLink (link, groupId, userId, title) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const result = await pool.request()
        .input('groupId', sql.Int, groupId)
        .input('link', sql.VarChar(300), link)
        .input('userId', sql.Int, userId)
        .input('title', sql.Int, title)
        .query(sqlQueries.addLink)
    //   return result.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async links (groupId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const Links = await pool.request()
        .query('select * from [dbo].Links where groupId = groupId')
      return Links
    } catch (err) {
      console.log(err)
    }
  }

  // only a user who posted the link can remove the link
  async removeLink (linkId, userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      const result = await pool.request()
        .input('linkId', sql.Int, linkId)
        .input('userId', sql.Int, userId)
        .query(sqlQueries.getGroupName)
    } catch (err) {
      console.log(err)
    }
  }

  async adminRemoveLink (linkId) {
    try {
      const pool = await this.dbpool
      const result = await pool.request()
        .input('linkId', sql.Int, linkId)
        .query(`Delete from [dbo].Links where linkId = ${linkId}`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = LinksRository
