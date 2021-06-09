
'use strict'
// const user = container.resolve('userRepository')
const { sql } = require('../../db')
const utils = require('../utils')

class groupRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
    this.getNumberOfGroups = this.getNumberOfGroups.bind(this)
    this.userIsRegistered = this.userIsRegistered.bind(this)
    this.addFirstMember = this.addFirstMember.bind(this)
    this.addingGroup = this.addingGroup.bind(this)
  }

async getGroupName (groupName) {
  const pool = await pools
  const sqlQueries = await utils.loadSqlQueries('groups')
  const result = await pool.request()
    .input('groupName', sql.VarChar(50), groupName)
    .query(sqlQueries.groupSearch)
  return result.recordset
}

async userIsMember (userId, groupId)  {
  try {
    const pool = await pools
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
  async userIsRegistered (email) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      const user = await pool.request()
        .input('userId', sql.Char(50), email)
        .query(sqlQueries.getUserByEmail)

      return user.recordset.length === 1
    } catch (error) {
      console.log(error)
    }
  }

  async getNumberOfGroups (emails) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      const getUser = await pool.request().input('email', sql.Char(50), emails)
        .query(sqlQueries.getGroupByAdminId)
      return getUser
    } catch (error) {
      console.log(error)
    }
  }

  async addingGroup (user) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      await pool.request().input('groupName_', sql.Char(50), user.groupName)
        .input('thumbnail_', sql.Char(250), user.thumbnail)
        .input('adminId_', sql.Char(250), user.email)
        .input('school_', sql.Char(250), user.school)
        .query(sqlQueries.addGroup)
    } catch (error) {
      console.log(error)
    }
  }

  async addFirstMember (groupId, userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      await pool.request().input('adminId_', sql.Char(50), userId)
        .input('groupId_', sql.Int, groupId)
        .query(sqlQueries.addFirstGroupMember)
    } catch (error) {
      console.log(error)
    }
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
