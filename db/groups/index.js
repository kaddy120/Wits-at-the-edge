const utils = require('../utils')
const { pools, sql } = require('../../db')

const createMeeting = async (meeting) => {
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

const userIsMember = async (userId, groupId) => {
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
  createMeeting,
  userIsMember
}
