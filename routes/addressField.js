const bcrypt = require('bcrypt')
const saltRounds = 10
const express = require('express')
const router = express.Router()


router.get('/address/name/:userName/surname/:userSurname/email/:userEmail/school/:schoolName/YOS/:yos/Password/:password', function (req, res, next) {
    res.render('address', { title: 'Fill in Address', name: req.params.userName, surname: req.params.userSurname, email: req.params.userEmail, 
    school: req.params.schoolName, YOS: req.params.yos, password: req.params.password})
})


router.post('/address', async (req, res, next) => {
    const repo = this.userRepository
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash
        repo.addUser(user).then(addUser => {
          // req.login()
          res.render('index')
        }).catch(err => {
          console.log(err)
        })
        if (err) {
          console.log(err)
        }
    }
}
   
})

module.exports = router