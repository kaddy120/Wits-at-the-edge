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

async function getVoterGroup(VOTER) {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const getGroup = await pool.request()
            .input('voter', sql.VarChar(50), VOTER.email)
            .query(sqlQueries.getVoterGroup)
        return getGroup
    } catch (err) {
        console.log(err)
    }
}

async function getRequestsToJoin() {
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


async function addVotes(Voter) {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const insertVoter = await pool.request()
            .input('request_id', sql.Int, Voter.request_id)
            .input('email', sql.VarChar(50), Voter.email)
            .input('voteCount', sql.Int, Voter.Accept)
            .query(sqlQueries.addVotes)
        return insertVoter
    } catch (err) {
        console.log(err)
    }
}


async function countVotes() {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const getVotes = await pool.request()
            .query(sqlQueries.getVotes)
        return getVotes
    } catch (err) {
        console.log(err)
    }
}


async function acceptRequest(email, group) {
    try {
        const sqlQueries = await utils.loadSqlQueries('Groups-voting')
        const pool = await pools
        const insertNewMember = await pool.request()
            .input('_email', sql.VarChar(50), email)
            .input('_group', sql.Int, group)
            .query(sqlQueries.addToGroup)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getVoterGroup,
    getRequestsToJoin,
    addVotes,
    countVotes,
    acceptRequest
}