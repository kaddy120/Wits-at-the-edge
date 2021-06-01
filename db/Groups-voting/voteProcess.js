const { sql, pools } = require('../../db')
const utils = require('../utils')
const voters = require('./user.json')
/*
List of pending requests
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
{id, userid, groupid},
*/
const requestGroup_id = 2
// when a user clicks to vote, I need to send the id of the current group
async function getRequestsToJoin (group_id) {
    try {
       const sqlQueries = await utils.loadSqlQueries('Groups-voting')
       const pool = await pools
       const getRequest = await pool.request()
            .input('_groupId', sql.Int, group_id)
            .query(sqlQueries.getRequestsToJoin)
            console.log(getRequest.recordset)
            return getRequest.recordset
    }catch (err){
        console.log(err)
    }
}

async function validateVotes(voterEmail, groupId) {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const getVoter = await pool.request().input('email', sql.VarChar(50), voterEmail)
            .input('groupId__', sql.Int, groupId)
            .query(sqlQueries.validateVotes)
            console.log(getVoter.recordset)
        if (getVoter.recordset.length === 1) {
            return true; }
        else { 
            return false};
    } catch (err) {
        console.log(err)
    }
}

async function addVotes(Voter) {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const insertVoter = await pool.request()
            .input('request_id', sql.Int, Voter.request_id)
            .input('email', sql.VarChar(50), Voter.email)
            .input('voteCount', sql.Int, Voter.Accept)
            .query(sqlQueries.addVotes)
            console.log(insertVoter.recordset)
        return insertVoter.recordset
    } catch (err) {
        console.log(err)
    }
}

async function countVotes() {
    try{
       const sqlQueries = await utils.loadSqlQueries('Groups-voting')
       const pool = await pools
       const getVotes = await pool.request()
           .query(sqlQueries.getVotes)
        console.log(getVotes.recordset)
    } catch (err) {
        console.log(err)
    }
}


async function acceptRequest() {
    try{
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const insertNewMember = await pool.request()
             .query()
    } catch (err) {
        console.log(err)
    }
}

//getRequestsToJoin(2)
validateVotes(voters.vote1.email, requestGroup_id)
//addVotes(voters.vote1)
//countVotes()
module.exports = {
    getRequestsToJoin,
    validateVotes,
    addVotes,
    countVotes
}