/* eslint-env jest */
const utils = require('../db/utils')

// this can be improved by making specif temp dir and .sql file for this test
describe('POST /sign-up', () => {
  test('utils can asses a SqlQueries from cd:roo/db/name', async () => {
    const query = await utils.loadSqlQueries('users')
    expect(query.addUser !== undefined).toBe(true)
  })
})
