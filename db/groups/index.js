
'use strict'
// const user = container.resolve('userRepository')
const { sql, pools } = require('../../db')
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
    const pool = await this.dbpool
    const sqlQueries = await utils.loadSqlQueries('groups')
    const result = await pool.request()
      .input('groupName', sql.VarChar(50), groupName)
      .query(sqlQueries.groupSearch)
    return result.recordset
  }

  async numberOfGroups () {
    try {
      const pool = await pools
      const result = await pool.request()
        .query('SELECT count(*) as numberOfGroups from [dbo].[Group]')
      return result.recordset.numberOfGroups
    } catch (err) {
      console.log(err)
    }
  }

  async firstTop (offsetNumber, number, userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await pools
      const result = await pool.request()
        .input('userId', sql.VarChar(50), userId)
        .input('offset_', sql.Int, offsetNumber)
        .input('getNum', sql.Int, number)
        .query(sqlQueries.getGroupsOffsetBy)
      return result.recordset
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

  async searchGroupByName (groupName, userId) {
    const like = `%${groupName}%`
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await pools
      const result = await pool.request()
        .input('userId', sql.VarChar(50), userId)
        // .input('offset_', sql.Int, offsetNumber)
        // .input('getNum', sql.Int, number)
        .input('like_', sql.VarChar(30), like)
        .query(sqlQueries.groupSearch)
      return result.recordset
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

  // better name is needed here
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

  async addingGroup (group) {
    try {
      const sqlQueries = await utils.loadSqlQueries('groups')
      const pool = await this.dbpool
      await pool.request().input('groupName_', sql.Char(50), group.groupName)
        .input('thumbnail_', sql.Char(250), group.thumbnail)
        .input('adminId_', sql.Char(250), group.email)
        .input('school_', sql.Char(250), group.school)
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
      const getMeeting = await pool.request()
        .input('groupId', sql.Int, meeting.groupId)
        .input('meetingTime', sql.DateTime, meeting.time)
        .input('agenda', sql.VarChar(250), meeting.agenda)
        .input('userId', sql.VarChar(50), meeting.userId)
        .input('address', sql.VarChar(250), meeting.address)
        .query(sqlQueries.createMeeting)
      return getMeeting.recordset
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

  async exitUserGroup (userDetails) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      await pool.request()
        .input('groupId', sql.Int, userDetails.groupId)
        .input('userId', sql.VarChar(50), userDetails.userId)
        .query(sqlQueries.exitUserGroup)
    } catch (err) {
      console.log(err)
    }
  }

  async getUserGroupName (groupId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const groupName = await pool.request()
        .input('groupId', sql.Int, groupId)
        .query(sqlQueries.getGroupName)
      return groupName.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getGroupMembers (groupId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('groups')
      const members = await pool.request()
          .input('groupId', sql.Int, groupId)
          .query(sqlQueries.getGroupMembers)
          return members
    } catch (err) {
       console.log(err)
    }
  }
}

module.exports = groupRepository
