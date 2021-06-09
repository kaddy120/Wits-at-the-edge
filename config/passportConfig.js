const bycrpt = require('bcrypt')

const Strategy = require('passport-local').Strategy

function config (userRepository, passport) {
  passport.use(new Strategy(
    { // or whatever you want to use
      usernameField: 'email', // define the parameter in req.body that passport can use as username and password
      passwordField: 'password'
    },
    function (username, password, done) {
      userRepository.getUserByEmail(username).then(user => {
        if (user.length === 0) { return done(null, false, { message: ' user is not found' }) }

        bycrpt.compare(password, user[0].passwordHash, function (err, result) {
          if (!result) {
            return done(null, false, { message: 'password donnot match' })
          }
          if (err) { done(err) }
          return done(null, user[0])
        })
      }).catch(err => done(err))
    })
  )
}

module.exports = config
