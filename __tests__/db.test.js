/* eslint-env jest */
const app = require('../app.js')
const request = require('supertest')
const db = require('../db.js')
const { pools } = require('../db.js')
const { pool } = require('mssql')

test('Database has one object', (done) => {
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

  // const response = await request(app).get('/database')
  // expect(response).toStrictEqual({ recordsets: [[{ '': 1 }]], recordset: [{ '': 1 }], output: {}, rowsAffected: [1] })
})
