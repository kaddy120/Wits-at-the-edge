const { sql, pools } = require('../../db')
const utils = require('../utils')


class votes {
    constructor ({dbpool}) {
        this.pools = dbpool
    }
}
async function getVoterGroup(voter) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await pools
        const getGroup = await pool.request()
            .input('voter', sql.VarChar(50), voter.email)
            .query(sqlQueries.getVoterGroup)
        return getGroup
    } catch (err) {
        console.log(err)
    }
}

async function getRequestsToJoin() {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await pools
        const getRequests = await pool.request()
            .query(sqlQueries.getRequestsToJoin)
        return getRequests
    } catch (err) {
        console.log(err)
    }
}

async function getNameOfRequester(email){
    try{
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await pools
      const getName = await pool.request()
            .input('email', sql.VarChar(50), email)
            .query(sqlQueries.getNameOfRequester)
      console.log(getName)
        return getName
    } catch (err) {
        console.log(err)
    }
}


async function addVotes(Voter) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await pools
        const insertVoter = await pool.request()
            .input('requestId', sql.Int, Voter.request_id)
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
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await pools
        const getVotes = await pool.request()
            .query(sqlQueries.getVotes)
        return getVotes
    } catch (err) {
        console.log(err)
    }
}

async function getNumOfGroupMembers (groupNum){
    try {
     const sqlQueries = await utils.loadSqlQueries('voting')
     const pool = await pools
     const getNum = await pool.request()
        .input('group', sql.VarChar(50), groupNum)
        .query(sqlQueries.getNumOfGroupMembers)
        return getNum.rowsAffected[0]
    } catch (err) {
        console.log(err)
    }
}


async function acceptRequest(email, group) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await pools
        const insertNewMember = await pool.request()
            .input('email', sql.VarChar(50), email)
            .input('group', sql.Int, group)
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
    acceptRequest,
    getNumOfGroupMembers,
    getNameOfRequester
}