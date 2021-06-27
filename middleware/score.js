const { container } = require('../di-setup')
const userRepository = container.resolve('userRepository')

function getScore (userId) {
  const numCreateMeating = userRepository.getScore(userId, 'createMeeting')
  const numJoinMeating = userRepository.getScore(userId, 'joinMeeting')
  const numJoinGroup = userRepository.getScore(userId, 'joinGroup')
  const score = numCreateMeating * 2 + numJoinMeating * 0.5 + numJoinGroup

  return score
}

module.exports = { getScore }
