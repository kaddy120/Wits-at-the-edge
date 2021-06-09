const bcrypt = require('bcrypt')
const saltRounds = 10
const { validationResult } = require('express-validator')

class userManager {
  constructor ({ userRepository }) {
    this.userRepository = userRepository
    this.postUser = this.postUser.bind(this)
  }

  async postUser (req, res, next) {
    const errors = validationResult(req)
    if (errors.array().length !== 0) {
      return res.status(400).json({ errors: errors.array() })
    }
    const user = { ...req.body }
    const temp = await this.userRepository.getUserByEmail(user.email)
    if (temp.length === 1) {
      return res.status(400).json({ errors: 'the email already exists' })
    }
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
      })
    })
  }
}

module.exports = userManager
