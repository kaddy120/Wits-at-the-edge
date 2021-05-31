const { sql, pools } = require('../../db')
const utils = require('../utils')
const users = require('./user.json')
/*
List of pending requests
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
*/

async function voteValidation(voterEmail, groupId) {
    try {
        const sqlQueries = await utils.loadSqlQueries('groups')
        const pool = await pools
        const insertUser = await pool.request().input('email', sql.VarChar(50), voterEmail)
            .input('groupId', sql.VarChar(50), groupId)
            .query(`select * from UserGroup where groupId=@groupId & userId=@email`)
        if (insertUser.recordset.length === 1) {
            return true;
        } else return false;

        console.log(insertUser.recordset)
    } catch (err) {
        console.log(err)
    }
}

async function addVote(userVote) {
    try {
        const sqlQueries = await utils.loadSqlQueries('groups')
        const pool = await pools
        const insertUser = await pool.request()
            .input('request_id', sql.Int, userVote.request_id)
            .input('email', sql.VarChar(50), userVote.email)
            .input('voteCount', sql.Int, userVote.Accept)
            .query(sqlQueries.addVote)
        console.log(typeof (insertUser))
        return insertUser.recordset
    } catch (err) {
        console.log(err)
    }
}

voteValidation(users.user3)
//addVote(users.user3)
module.exports = {
    addVote
}