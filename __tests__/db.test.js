/* eslint-env jest */
const db = require('../db.js')

test('Database has one object', (done) => {
  jest.setTimeout(300000)
  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT 1')
    })
    .then(result => {
      expect(result).toStrictEqual({ recordsets: [[{ '': 1 }]], recordset: [{ '': 1 }], output: {}, rowsAffected: [1] })
      db.pools.then((pool) => {
        pool.close()
        done()
      })
      done()
    })
})
