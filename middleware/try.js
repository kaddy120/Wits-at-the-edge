const { container } = require('../di-setup')
const groupRepository = container.resolve('groupRepository')

module.exports = groupRepository
