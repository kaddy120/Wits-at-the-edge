const awilix = require('awilix')
const { pools } = require('./db')
const userManager = require('./controllers/userManager')
const userRepository = require('./db/users')
const voteManager = require('./controllers/voteManager')
const votesRepository = require('./db/voting')
const { votingRouters } = require('./routes/votes')
// const passwordConfig = require('./config')

const groupRepository = require('./db/groups')
const { accountManagerRouters } = require('./routes/accountManager')
const { meetingRouters } = require('./routes/meeting')
const passport = require('passport')


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

const Lifetime = awilix.Lifetime

container.register(
  {
    dbpool: awilix.asValue(pools),
    userManager: awilix.asClass(userManager, { lifetime: Lifetime.SINGLETON }),
    voteManager: awilix.asClass(voteManager, {lifetime: Lifetime.SINGLETON}),
    votesRepository: awilix.asClass(votesRepository, { lifetime: Lifetime.SINGLETON}),
    votingRouters: awilix.asFunction(votingRouters),
    userRepository: awilix.asClass(userRepository, { lifetime: Lifetime.SCOPED }),

    groupRepository: awilix.asClass(groupRepository, { lifetime: Lifetime.SCOPED }),
    passport: awilix.asValue(passport),
    meetingRouters: awilix.asFunction(meetingRouters),
    accountManagerRouters: awilix.asFunction(accountManagerRouters)
    // passport: awilix.asClass(passwordConfig, { lifetime: Lifetime.SINGLETON })
  })

module.exports = {
  container
}
