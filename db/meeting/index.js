'use strict'
const { sql } = require('../../db')
const utils = require('../utils')
const nodemailer = require('nodemailer')

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

  async getAttendedMeetings (userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const meetings = await pool.request()
        .input('userId', sql.VarChar(250), userId)
        .query(sqlQueries.getAttendedMeetings)
      return meetings.recordset
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

  async getNotificationMember (userId, meetingId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const meetings = await pool.request()
        .input('userId', sql.VarChar(250), userId)
        .input('meetingId', sql.Int, meetingId)
        .query(sqlQueries.getNotificationMember)
      return meetings.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async setFinishTime (userId, meetingId, finishTime, distance) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('userId', sql.VarChar(250), userId)
        .input('meetingId', sql.Int, meetingId)
        .input('finishTime', sql.DateTime, finishTime)
        .input('distance', sql.Real, distance)
        .query(sqlQueries.setFinishTime)
    } catch (err) {
      console.log(err)
    }
  }

  async updateDistance (userId, meetingId, distance) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('userId', sql.VarChar(250), userId)
        .input('meetingId', sql.Int, meetingId)
        .input('distance', sql.Real, distance)
        .query(sqlQueries.updateDistance)
    } catch (err) {
      console.log(err)
    }
  }

  async getUserAddress (userId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const useraddress = await pool.request()
        .input('userId', sql.VarChar(250), userId)
        .query(sqlQueries.getUserAddress)
      return useraddress.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getFinishedMeetingById (meetingId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const meetings = await pool.request()
        .input('meetingId', sql.Int, meetingId)
        .query(sqlQueries.getFinishedMeetingById)
      return meetings.recordset.length
    } catch (err) {
      console.log(err)
    }
  }

  async getAllMemberDistances () {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      const meetings = await pool.request()
        .query(sqlQueries.getAllMemberDistances)
      return meetings.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async updateTime (finishTime, meetingId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('finishTime', sql.DateTime, finishTime)
        .input('meetingId', sql.Int, meetingId)
        .query(sqlQueries.updateTime)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteMeeting (meetingId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('meeting')
      const pool = await this.dbpool
      await pool.request()
        .input('meetingId', sql.Int, meetingId)
        .query(sqlQueries.deleteMeeting)
    } catch (err) {
      console.log(err)
    }
  }

  async sendEmail (userId, agenda) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'witsappportalMain@gmail.com', // Will be the email setup for our webpage on next sprint
        pass: 'qwe123$%^' // Will be the password to our email address
      }
    })

    const mailOptions = {
      from: 'witsappportalMain@gmail.com',
      to: userId, // Can put multiple users
      subject: 'Meeting Tracking',
      text: agenda
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      }
    })
  }
}
module.exports = meetingRepository
