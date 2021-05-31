const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: 'EXPRESS' })
})

router.get('/group', function (req, res, next) {
  res.render('group')
})

router.post('/group', function (req, res, next) {
  const email = req.body.adminId
  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT [email] FROM [User]')
    })
    .then((data) => {
      const users = data.recordset
      const Userfound = users.findIndex((useremail) => {
        return (useremail.email === email)
      })
      if (Userfound !== -1) {
        db.pools
          .then((pool) => {
            return pool.request()
              .query('INSERT INTO [Group](groupName,thumbnail,adminId,school)  VALUES (\'' + req.body.GroupName + '\',\'' + req.body.Thumbnail + '\',\'' + req.body.adminId + '\',\'' + req.body.school + '\')')
          })
          .catch((error) => {
            console.log(error)
          })
        res.redirect('/group')
      } else {
        res.redirect('/group/group')
      }
    })
    .catch((error) => {
      throw error
    })
})
module.exports = router