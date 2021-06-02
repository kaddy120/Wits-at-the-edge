const passport = require('passport')
const LocalStrategy = require('passport-local')
const bycrpt = require('bcrypt')

class config {
  constructor ({ userRepository }) {
    this.userRepository = userRepository
    this.passportLocalStrategy = this.passportLocalStrategy.bind(this)
  }

  async passportLocalStrategy () {
    passport.use(new LocalStrategy(
      function (email, password, done) {
        this.userRepository.getUserByEmail(email).then(user => {
          if (user.length === 0) { return done(null, false) }

          bycrpt.compare(passport, user.passport, function (err, result) {
            if (!result) {
              return done(null, false)
            }
            if (err) { console.log(err) }
          })
          return done(null, user)
        }).catch(err => done(err))
      })
    )
    return passport
  }
}

module.exports = config
