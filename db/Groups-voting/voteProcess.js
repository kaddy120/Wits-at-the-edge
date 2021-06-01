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

async function getVoterGroup (VOTER) {
    try {
       const sqlQueries = await utils.loadSqlQueries('Groups-voting')
       const pool = await pools
       const getGroup = await pool.request()
           .input('voter', sql.VarChar(50), VOTER.email)
           .query(sqlQueries.getVoterGroup)
           return getGroup
    } catch (err){
        console.log(err)
    }
}

async function getRequestsToJoin () {
    try {
       const sqlQueries = await utils.loadSqlQueries('Groups-voting')
       const pool = await pools
       const getRequests = await pool.request()
            .query(sqlQueries.getRequestsToJoin)
            return getRequests
    } catch (err) {
        console.log(err)
    }
}

/*async function validateVotes(voterEmail, groupId) {
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
}*/

//getRequestsToJoin()
//validateVotes(voters.vote1.email, requestGroup_id)
//addVotes(voters.vote1)
//countVotes()
//getVoterGroup(voters.vote1)
module.exports = {
    getVoterGroup,
    getRequestsToJoin,
    /*validateVotes,
    addVotes,
    countVotes*/
}