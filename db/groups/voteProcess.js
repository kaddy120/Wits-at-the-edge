const { sql, pools } = require('../../db')
const utils = require('../utils')
const users = require('./user.json')

async function voteValidation (user) {
    try{
         const sqlQueries = await utils.loadSqlQueries('groups')
         const pool = await pools
         const insertUser = await pool.request()
            .query(`select * from UserGroup ${user.email}`)
            console.log(insertUser.recordset)
    } catch (err){
        console.log(err)
    }
}

async function addVote (userVote) {
    try{
       const sqlQueries = await utils.loadSqlQueries('groups')
       const pool = await pools
       const insertUser = await pool.request()
           .input('request_id', sql.Int, userVote.request_id)
           .input('email', sql.VarChar(50), userVote.email)
           .input('voteCount', sql.Int, userVote.Accept)
           .query(sqlQueries.addVote)
           console.log(typeof(insertUser))
           return insertUser.recordset
    }catch (err){
        console.log(err)
    }
}

voteValidation (users.user3)
//addVote(users.user3)
module.exports = {
    addVote
}