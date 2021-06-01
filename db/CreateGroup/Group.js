const { sql, pools } = require('../../db.js')
const utils = require('../utils')

async function Validation (email) {
  try {
    const Sqlqueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    const getUser = pool.request()
      .query(Sqlqueries.Validate)
    return getUser
  } catch (error) {
    console.log(error)
  }
}
async function MaximumGroups (emails) {
  try {
    const Sqlqueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    const getUser = pool.request().input('email', sql.Char(50), emails)
      .query(Sqlqueries.maxgroup)
    return getUser
  } catch (error) {
    console.log(error)
  }
}

async function AddingGroup (user) {
  try {
    const Sqlqueries = await utils.loadSqlQueries('CreateGroup')
    const pool = await pools
    pool.request().input('groupname_', sql.Char(50), user.groupname)
      .input('thumbnail_', sql.Char(50), user.thumbnail)
      .input('adminId_', sql.Char(50), user.email)
      .input('school_', sql.Char(50), user.school)
      .query(Sqlqueries.AddGroup)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  Validation,
  MaximumGroups,
  AddingGroup
}
