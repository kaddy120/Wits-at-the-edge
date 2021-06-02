const awilix = require('awilix')
const { pools } = require('./db')
const userManager = require('./controllers/userManager')
const userRepository = require('./db/users')
// const passwordConfig = require('./config')

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

const Lifetime = awilix.Lifetime

container.register(
  {
    dbpool: awilix.asValue(pools),
    userManager: awilix.asClass(userManager, { lifetime: Lifetime.SINGLETON }),
    userRepository: awilix.asClass(userRepository, { lifetime: Lifetime.SINGLETON })
    // passport: awilix.asClass(passwordConfig, { lifetime: Lifetime.SINGLETON })
  })

module.exports = {
  container
}
