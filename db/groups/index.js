const { sql } = require('../../db')
const utils = require('../utils')

class groupRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
    this.createMeeting = this.createMeeting.bind(this)
    this.userIsMember = this.userIsMember.bind(this)
  }

  async createMeeting (meeting) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      await pool.request()
        .input('groupId', sql.Int, meeting.groupId)
        .input('meetingTime', sql.DateTime, meeting.time)
        .input('agenda', sql.VarChar(250), meeting.agenda)
        .input('userId', sql.VarChar(50), meeting.userId)
        .query(sqlQueries.createMeeting)
    } catch (err) {
      console.log(err)
    }
  }

  async userIsMember (userId, groupId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const member = await pool.request()
        .input('userId', sql.VarChar(50), userId)
        .input('groupId', sql.Int, groupId)
        .query(sqlQueries.userIsMember)
      return member.recordset.length === 1
    } catch (err) {
      console.log(err)
    }
  }

  async getUserGroups (userId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const groups = await pool.request()
      .input('user', sql.VarChar(50), userId)
      .query(sqlQueries.getUserGroups)
      return groups
    } catch (err) {
      console.log(err)
    }
  }

  async getGroupThumbnail (userId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const thumbnail = await pool.request()
      .input('user', sql.VarChar(50), userId)
      .query(sqlQueries.getGroupThumbnail)
      return thumbnail
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = groupRepository
