const { sql, pools } = require('../../db.js')
const utils = require('../utils')

async function getUserEmails (email) {
  try {
    const sqlQueries = await utils.loadSqlQueries('createGroup')
    const pool = await pools
    const getUser = pool.request()
      .query(sqlQueries.getAllEmailColumn)
    return getUser
  } catch (error) {
    console.log(error)
  }
}
async function getNumberOfGroups (emails) {
  try {
    const sqlQueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    const getUser = pool.request().input('email', sql.Char(50), emails)
      .query(sqlQueries.getGroupByEmail)
    return getUser
  } catch (error) {
    console.log(error)
  }
}

async function addingGroup (user) {
  try {
    const sqlQueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    pool.request().input('groupName_', sql.Char(50), user.groupName)
      .input('thumbnail_', sql.Char(50), user.thumbnail)
      .input('adminId_', sql.Char(50), user.email)
      .input('school_', sql.Char(50), user.school)
      .query(sqlQueries.addGroup)
  } catch (error) {
    console.log(error)
  }
}
async function addFirstMember (groupId, userId) {
  try {
    const sqlQueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    pool.request().input('adminId_', sql.Char(50), userId)
      .input('groupId_', sql.Int, groupId)
      .query(sqlQueries.addFirstPerson)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getUserEmails,
  getNumberOfGroups,
  addingGroup,
  addFirstMember
}
