'use strict'
const utils = require('../utils')
const { pools, sql } = require('../../db')
const { container } = require('../../di-setup')
// const user = container.resolve('userRepository')

class groupRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
    this.getNumberOfGroups = this.getNumberOfGroups.bind(this)
    this.userIsRegistered = this.userIsRegistered.bind(this)
    this.addFirstMember = this.addFirstMember.bind(this)
    this.addingGroup = this.addingGroup.bind(this)
  }

  async userIsRegistered (email) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      const user = pool.request()
        .input('userId', sql.Char(50), email)
        .query(sqlQueries.getUserByEmail)
      console.log(user)
      return user.recordset.length === 1
    } catch (error) {
      console.log(error)
    }
  }

  async getNumberOfGroups (emails) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      const getUser = pool.request().input('email', sql.Char(50), emails)
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
      pool.request().input('groupName_', sql.Char(50), user.groupName)
        .input('thumbnail_', sql.Char(50), user.thumbnail)
        .input('adminId_', sql.Char(50), user.email)
        .input('school_', sql.Char(50), user.school)
        .query(sqlQueries.addGroup)
    } catch (error) {
      console.log(error)
    }
  }

  async addFirstMember (groupId, userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      pool.request().input('adminId_', sql.Char(50), userId)
        .input('groupId_', sql.Int, groupId)
        .query(sqlQueries.addFirstGroupMember)
    } catch (error) {
      console.log(error)
    }
  }
}

async function createMeeting (meeting) {
  try {
    const pool = await pools
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

async function userIsMember (userId, groupId) {
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

module.exports = {
  groupRepository,
  createMeeting,
  userIsMember
}
