'use strict'
const { sql } = require('../../db')
const utils = require('../utils')

class meetingRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }

  async getAllUserNotifications (userId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const meetings = await pool.request()
        .input('userId', sql.VarChar(50), userId)
        .query(sqlQueries.getMeetings)
      return meetings.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getAllUserMeetings (meetingId) {
    try {
      const pool = await this.dbpool
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const meetings = await pool.request()
        .input('meetingId', sql.Int, meetingId)
        .query(sqlQueries.getMeetingByMeetingId)
      return meetings.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getGroupMembers (groupId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const getMembers = await pool.request()
        .input('groupId', sql.Int, groupId) // .input('groupId', sql.Int, userMeetings.groupId)
        .query(sqlQueries.getGroupMembers)
      return getMembers.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async addMeetings (groupMembers, meetingId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('meetingId_', sql.Int, meetingId)
        .input('userId_', sql.VarChar(250), groupMembers.userId)
        .input('response_', null)
        .query(sqlQueries.addMeetings)
    } catch (err) {
      console.log(err)
    }
  }

  async updateNotification (notificationId, response) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('response_', sql.Int, response)
        .input('notificationId', sql.Int, notificationId)
        .query(sqlQueries.updateNotification)
    } catch (err) {
      console.log(err)
    }
  }

  async getUserCoordinates () {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const get = pool.request()
         .query(sqlQueries.getUserCoordinates)
         return get
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = meetingRepository
