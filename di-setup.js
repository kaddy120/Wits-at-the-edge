const awilix = require('awilix')
const { pools } = require('./db')
const userManager = require('./controllers/userManager')
const userRepository = require('./db/users')
const { accountManagerRouters } = require('./routes/accountManager')
const passport = require('passport')

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

const Lifetime = awilix.Lifetime

container.register(
  {
    dbpool: awilix.asValue(pools),
    userManager: awilix.asClass(userManager, { lifetime: Lifetime.SINGLETON }),
    userRepository: awilix.asClass(userRepository, { lifetime: Lifetime.SINGLETON }),
    passport: awilix.asValue(passport),
    accountManagerRouters: awilix.asFunction(accountManagerRouters)
    // passport: awilix.asClass(passwordConfig, { lifetime: Lifetime.SINGLETON })
  })

module.exports = {
  container
}
