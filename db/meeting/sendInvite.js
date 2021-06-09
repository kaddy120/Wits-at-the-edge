const utils = require('../utils')
const { pools, sql } = require('../../db')
const nodemailer = require('nodemailer')

// Till there are valid users in the database
const user = {
  meetingId: 1,
  groupId: 2,
  meetingTime: '2021-06-15 03:24:00.000',
  agenda: 'hgfjh',
  userId: 'kaddy120@gmail.com'
}

// Get all available Meetings
let userMeetings = []
async function getMeeting (meeting) {
  try {
    const sqlQueries = await utils.loadSqlQueries('meeting')
    const pool = await pools
    const getUser = await pool.request()
      .input('groupId', sql.Int, meeting.groupId)
      .input('meetingTime', sql.DateTime, meeting.time)
      .input('agenda', sql.VarChar(250), meeting.agenda)
      .input('userId', sql.VarChar(50), meeting.userId)
      .query(sqlQueries.getMeeting)
    userMeetings = getUser
    console.log(userMeetings.recordset)
    return getUser.recordset
  } catch (err) {
    console.log(err)
  }
}

// Get all group members of a certain meeting using dbo.UserGroup Database
async function getGroupMembers (groupId)/* (userMeetings) */ {
  try {
    const sqlQueries = await utils.loadSqlQueries('meeting')
    const pool = await pools
    const getMembers = await pool.request()
      .input('groupId', sql.Int, groupId) // .input('groupId', sql.Int, userMeetings.groupId)
      .query(sqlQueries.getGroupMembers)
    return getMembers.recordset
  } catch (err) {
    console.log(err)
  }
}

// Testing async functions
getMeeting(user)
getGroupMembers(user.groupId)

/* Sending to multiple users with valid email address
 const recipients = userMeetings.map(userMeetings => userMeetings.userId) // .join(',')
 console.log(recipients) */

// Send Email To users
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'Your email here', // Will be the email setup for our webpage on next sprint
    pass: 'Your password' // Will be the password to our email address
  }
})

const mailOptions = {
  from: 'your email',
  to: 'Recipient email', // Can put multiple users
  subject: 'Sending Email using Node.js',
  text: user.agenda
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
