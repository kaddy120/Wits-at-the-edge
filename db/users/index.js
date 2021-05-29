const { MAX } = require('mssql')
const { sql, pools } = require('../../db')
const utils = require('../utils')

async function getUsers () {
  try {
    const pool = await pools
    const users = await pool.request().query('SELECT * from dbo.[User]')
    return users.recordsets
  } catch (err) {
    console.log(err)
  }
}

async function addUser (user) {
  try {
    const sqlQueries = await utils.loadSqlQueries('users')
    const pool = await pools
    const insertUser = await pool.request()
      .input('email', sql.VarChar(50), user.email)
      .input('firstName', sql.VarChar(50), user.name)
      .input('surname', sql.VarChar(50), user.surname)
      .input('school', sql.VarChar(50), user.school)
      .input('thumbnail', sql.VarChar(MAX), user.thumbnail)
      .input('passwordHash', sql.VarChar(MAX), user.password)
      .input('yearOfStudy', sql.Char(10), user.yearOfStudy)
      .query(sqlQueries.addUser)
    return insertUser.recordset
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getUsers: getUsers,
  addUser: addUser

}
