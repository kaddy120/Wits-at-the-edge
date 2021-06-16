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
    console.log(user)
    res.redirect(`/address/name/${user.name}/surname/${user.surname}/email/${user.email}/school/${user.school}/YOS/${user.yearOfStudy}/Password/${user.password}`)

  }
}

module.exports = userManager
