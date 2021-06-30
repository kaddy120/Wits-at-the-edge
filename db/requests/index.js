const utils = require('../utils')
const { sql } = require('../../db')

class request {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }

  async addJoinRequest (userId, groupId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('requests') // Specify the folder I will be using under db
      const pool = await this.dbpool
      await pool.request()
        .input('groupId', sql.Int, groupId)
        .input('email', sql.VarChar(50), userId)
        .query(sqlQueries.addJoinRequest)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = request
