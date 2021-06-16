const { sql } = require('../../db')
const utils = require('../utils')

class SearchRepository {
  constructor ({ dbpool }) {
    this.dbpool = dbpool
  }
}
module.exports = SearchRepository
