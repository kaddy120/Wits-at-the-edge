const awilix = require('awilix')
const { pools } = require('./db')
const userManager = require('./controllers/userManager')
const voteManager = require('./controllers/voteManager')
const { votingRouters } = require('./routes/votes')
const meetingRepository = require('./db/meeting/index')
const recommendationEngine = require('./recomendEngine')

const userRepository = require('./db/users')
const votesRepository = require('./db/voting')
const requestRepository = require('./db/requests')
const groupRepository = require('./db/groups')
const linkRepository = require('./db/links')
const { accountManagerRouters } = require('./routes/accountManager')
const requestRouters = require('./routes/request')
const { linkRouters } = require('./routes/link')
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
    voteManager: awilix.asClass(voteManager, { lifetime: Lifetime.SINGLETON }),
    votesRepository: awilix.asClass(votesRepository, { lifetime: Lifetime.SINGLETON }),
    votingRouters: awilix.asFunction(votingRouters),
    userRepository: awilix.asClass(userRepository, { lifetime: Lifetime.SCOPED }),
    groupRepository: awilix.asClass(groupRepository, { lifetime: Lifetime.SCOPED }),
    requestRepository: awilix.asClass(requestRepository, { lifetime: Lifetime.SCOPED }),
    passport: awilix.asValue(passport),
    meetingRepository: awilix.asClass(meetingRepository, { lifetime: Lifetime.SINGLETON }),
    meetingRouters: awilix.asFunction(meetingRouters),
    requestRouters: awilix.asFunction(requestRouters),
    accountManagerRouters: awilix.asFunction(accountManagerRouters),
    linkRouters: awilix.asFunction(linkRouters),
    recommendationEngine: awilix.asClass(recommendationEngine, { lifetime: Lifetime.SINGLETON }),
    linkRepository: awilix.asClass(linkRepository, { lifetime: Lifetime.SINGLETON })
  })

module.exports = {
  container
}
