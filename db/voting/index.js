const { sql } = require('../../db')
const utils = require('../utils')


class votesRepository {
    constructor({ dbpool }) {
        this.dbpool = dbpool
    }

    async getVoterGroup(voter) {
        try {
            const sqlQueries = await utils.loadSqlQueries('voting')
            const pool = await this.dbpool
            const getGroup = await pool.request()
                .input('voter', sql.VarChar(50), voter.email)
                .query(sqlQueries.getVoterGroup)
            return getGroup
        } catch (err) {
            console.log(err)
        }
    }

    async getRequestsToJoin() {
        try {
            const sqlQueries = await utils.loadSqlQueries('voting')
            const pool = await this.dbpool
            const getRequests = await pool.request()
                .query(sqlQueries.getRequestsToJoin)
            return getRequests
        } catch (err) {
            console.log(err)
        }
    }

      
async getNameOfRequester(email) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const getName = await pool.request()
            .input('email', sql.VarChar(50), email)
            .query(sqlQueries.getNameOfRequester)

        return getName
    } catch (err) {
        console.log(err)
    }
}

async addVotes(requestId, email, vote) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const insertVoter = await pool.request()
            .input('requestId', sql.Int, requestId)
            .input('email', sql.VarChar(50), email)
            .input('voteCount', sql.Int, vote)
            .query(sqlQueries.addVotes)
        return insertVoter
    } catch (err) {
        console.log(err)
    }
}

async countVotes(requestId) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const getVotes = await pool.request()
            .input('requestId', sql.Int, requestId)
            .query(sqlQueries.getVotes)
        return getVotes
    } catch (err) {
        console.log(err)
    }
}

async getNumOfGroupMembers(groupNum) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const getNum = await pool.request()
            .input('group', sql.VarChar(50), groupNum)
            .query(sqlQueries.getNumOfGroupMembers)
        return getNum.rowsAffected[0]
    } catch (err) {
        console.log(err)
    }
}

async removeFromJoinRequests(requestId) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const remove = await pool.request()
            .input('requestId', sql.Int, requestId)
            .query(sqlQueries.removeFromJoinRequests)
    } catch (err) {
        console.log(err)
    }
}

async acceptRequest(email, group) {
    try {
        const sqlQueries = await utils.loadSqlQueries('voting')
        const pool = await this.dbpool
        const insertNewMember = await pool.request()
            .input('email', sql.VarChar(50), email)
            .input('group', sql.Int, group)
            .query(sqlQueries.addToGroup)
    } catch (err) {
        console.log(err)
    }
}

}

module.exports = votesRepository