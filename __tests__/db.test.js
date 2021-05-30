/* eslint-env jest */
const { pools } = require('../db.js')

test('Database has one object', async () => {
  jest.setTimeout(30000)
  const pool = await pools
  const result = await pool.request().query('SELECT 1')
  expect(result).toStrictEqual({ recordsets: [[{ '': 1 }]], recordset: [{ '': 1 }], output: {}, rowsAffected: [1] })
})
