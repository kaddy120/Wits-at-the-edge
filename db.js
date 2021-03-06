require('dotenv').config({ path: '.env' })
const mssql = require('mssql')

const config = {
  server: 'mywits.database.windows.net',
  database: 'MyWitsieDb',
  // Put login details in env. variables for security
  user: process.env.user_name,
  password: process.env.password,
  port: 1433,
  // Required for Azure
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 60000
  }
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null

const pools = new mssql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to DB')
    return pool
  })

  .catch(err => {
    // Handle errors
    isConnected = false
    connectionError = err
    console.log(err)
  })
module.exports = {
  sql: mssql,
  pools: pools,
  isConnected: isConnected,
  connectionError: connectionError
}
