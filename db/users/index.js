const { MAX } = require('mssql')
const { sql } = require('../../db')
const utils = require('../utils')

class userRepository {
  constructor ({ dbpool }) {
    this.pools = dbpool
    this.getUsers = this.getUsers.bind(this)
  }

  async getUsers () {
    try {
      const pool = await this.pools
      const users = await pool.request().query('SELECT * from dbo.[User]')
      return users.recordsets
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByEmail (email) {
    const sqlQueries = await utils.loadSqlQueries('users')
    const pool = await this.pools
    const result = await pool.request()
      .input('email', sql.VarChar(50), email)
      .query(sqlQueries.getUserByEmail)
    return result.recordset
  }

  async addUser (user) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
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

  async addUserAddress (userId, address) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const insertUser = await pool.request()
        .input('email', sql.VarChar(50), userId)
        .input('address', sql.VarChar(150), address)
        .query(sqlQueries.addUserAddress)
      console.log('addes')
    } catch (err) {
      console.log(err)
    }
  }

  async addTracking (userId, response, groupId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.dbpool
      await pool.request()
        .input('userID', sql.Int, userId)
        .input('response', sql.Int, response)
        .input('groupId', sql.Int, groupId)
        .query(sqlQueries.addTracking)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userRepository
