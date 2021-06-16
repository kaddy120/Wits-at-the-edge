const bcrypt = require('bcrypt')
const saltRounds = 10
const { validationResult } = require('express-validator')

class userManager {
  constructor ({ userRepository }) {
    this.userRepository = userRepository
    this.postUser = this.postUser.bind(this)
    this.addUser = this.addUser.bind(this)
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
    console.log(user)
    res.redirect(`/address/name/${user.name}/surname/${user.surname}/email/${user.email}/school/${user.school}/YOS/${user.yearOfStudy}/Password/${user.password}`)

  }

  async addUser (req, res, next) {
    
    const user = { ...req.body }
    const address = `${req.body.streetAddress}, ${req.body.suburb}, ${req.body.city}, ${req.body.postalCode}`
    console.log(user)
    const repo = this.userRepository
    console.log(address)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        console.log(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash
        
        repo.addUser(user).then(addUser => {
          repo.addUserAddress(user.email, address)
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
