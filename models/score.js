const { container } = require('../di-setup')
const userRepository = container.resolve('userRepository')

async function getScore (userId) {
  const numCreateMeating = await userRepository.getActivityCount(userId, 'createMeating')
  const numJoinMeating = await userRepository.getActivityCount(userId, 'joinMeeting')
  const numJoinGroup = await userRepository.getActivityCount(userId, 'joinGroup')
  const score = numCreateMeating * 2 + numJoinMeating * 0.5 + numJoinGroup
  console.log('The score is')
  console.log(score)

  return score
}

module.exports = { getScore }
