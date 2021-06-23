const { sql } = require('../../db')
const utils = require('../utils')

class votesRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }

  async getVoterGroup (voter) {
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

  async getRequestsToJoin () {
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

  async getNameOfRequester (email) {
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

  async terminationVote (requestId, email, vote) {
    try {
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await this.dbpool
      const insertVoter = await pool.request()
        .input('requestId', sql.Int, requestId)
        .input('email', sql.VarChar(50), email)
        .input('voteCount', sql.Int, vote)
        .query(sqlQueries.terminationVotes)
        console.log("HEREEE")
      return insertVoter
    } catch (err) {
      console.log(err)
    }
  }

  async addVotes (requestId, email, vote) {
    try {
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await this.dbpool
      const insertVoter = await pool.request()
        .input('requestId', sql.Int, requestId)
        .input('email', sql.VarChar(50), email)
        .input('voteCount', sql.Int, vote)
        .query(sqlQueries.addVotes)
        console.log("HEREEE")
      return insertVoter
    } catch (err) {
      console.log(err)
    }
  }

  async countVotes (requestId) {
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
   
  async getMemberToBeTerminated (requestId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await this.dbpool
      const getMember = await pool.request()
      .input('requestId', sql.Int, requestId)
      .query(sqlQueries.getMemberToBeTerminated)
     return getMember
    } catch (err) {
      console.log(err)
    }
  }

  async deleteMember (user, groupId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await this.dbpool
      const getMember = await pool.request()
      .input('groupId', sql.Int, groupId)
      .input('email', sql.VarChar(50), user)
      .query(sqlQueries.removeMemberFromGroup)
    } catch (err) {
      console.log(err)
    }
  }
  async CountVotes (requestId) {
    try {
      const sqlQueries = await utils.loadSqlQueries('voting')
      const pool = await this.dbpool
      const getVotes = await pool.request()
        .input('requestId', sql.Int, requestId)
        .query(sqlQueries.votes)
      return getVotes
    } catch (err) {
      console.log(err)
    }
  }

  async getNumOfGroupMembers (groupNum) {
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

  async removeFromJoinRequests (requestId) {
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

  async acceptRequest (email, group) {
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
