const { sql, pools } = require('../../db')
const utils = require('../utils')
const users = require('./user.json') // User objects in space of Database

async function addJoinRequest (user) {
  try {
    const sqlQueries = await utils.loadSqlQueries('joinGroup') // Specify the folder I will be using under db
    const pool = await pools
    const insertUser = await pool.request()
      .input('groupId', sql.Int, user.groupId)
      .input('email', sql.VarChar(50), user.email)
      .query(sqlQueries.addJoinRequest)
    // console.log(typeof (insertUser))
    return insertUser.recordset
  } catch (err) {
    console.log(err)
  }
}
addJoinRequest(users.userOne)
addJoinRequest(users.userTwo)
addJoinRequest(users.userThree)

module.exports = addJoinRequest
