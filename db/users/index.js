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

  async addJoinRequest (userId, groupId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users') // Specify the folder I will be using under db
      const pool = await this.pools
      const insertUser = await pool.request()
        .input('groupId', sql.Int, groupId)
        .input('email', sql.VarChar(50), userId)
        .query(sqlQueries.addJoinRequest)
      console.log(insertUser)
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
      console.log(insertUser)
    } catch (err) {
      console.log(err)
    }
  }

  // invite Users to A Group starts here
  async getUserByfName (firstName) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .query(sqlQueries.getUserByfName)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameSurname (firstName, surname) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('surname', sql.VarChar(50), surname)
        .query(sqlQueries.getUserByfNameSurname)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameYOS (firstName, yearOfStudy) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('yearOfStudy', sql.VarChar(50), yearOfStudy)
        .query(sqlQueries.getUserByfNameYOS)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameSchool (firstName, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserByfNameSchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameSurnameYOS (firstName, surname, yearOfStudy) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('surname', sql.VarChar(50), surname)
        .input(' yearOfStudy', sql.VarChar(50), yearOfStudy)
        .query(sqlQueries.getUserByfNameSurnameYOS)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameSurnameSchool (firstName, surname, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('surname', sql.VarChar(50), surname)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserByfNameSurnameSchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByfNameYosSchool (firstName, yearOfStudy, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('yearOfStudy', sql.VarChar(50), yearOfStudy)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserByfNameYosSchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByFullNameYOSschool (firstName, surname, yearOfStudy, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('firstName', sql.VarChar(50), firstName)
        .input('surname', sql.VarChar(50), surname)
        .input('yearOfStudy', sql.VarChar(50), yearOfStudy)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserByFullNameYOSschool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserBySurname (surname) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('surname', sql.VarChar(50), surname)
        .query(sqlQueries.getUserBySurname)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserBySurnameSchool (surname, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('surname', sql.VarChar(50), surname)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserBySurnameSchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserBySurnameYOS (surname, yearOfStudy) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('surname', sql.VarChar(50), surname)
        .input('yearOfStudy)', sql.VarChar(50), yearOfStudy)
        .query(sqlQueries.getUserBySurnameYOS)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserBySurnameYosSchool (surname, yearOfStudy, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('surname', sql.VarChar(50), surname)
        .input('yearOfStudy)', sql.VarChar(50), yearOfStudy)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserBySurnameYosSchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByYOS (yearOfStudy) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('yearOfStudy', sql.VarChar(50), yearOfStudy)
        .query(sqlQueries.getUserByYOS)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserByYOSschool (yearOfStudy, school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('yearOfStudy', sql.VarChar(50), yearOfStudy)
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserByYOSschool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getUserBySchool (school) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('school', sql.VarChar(50), school)
        .query(sqlQueries.getUserBySchool)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }

  async getRequest (email) {
    try {
      const sqlQueries = await utils.loadSqlQueries('users')
      const pool = await this.pools
      const getUser = await pool.request()
        .input('email', sql.VarChar(50), email)
        .query(sqlQueries.getRequest)
      return getUser.recordset
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userRepository
