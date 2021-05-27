const db = require('../db.js')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  // Make a query to the database
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // This is only a test query, change it to whatever you need
        .query('SELECT 1')
    })
  // Send back the result
    .then(result => {
      res.send(result)
      console.log(result)
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = router
