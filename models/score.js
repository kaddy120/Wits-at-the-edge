const { container } = require('../di-setup')
const userRepository = container.resolve('userRepository')

async function getScore (userId) {
  const numCreateMeating = await userRepository.getActivityCount(userId, 'createMeating')
  const numJoinMeating = await userRepository.getActivityCount(userId, 'joinMeeting')
  const numJoinGroup = await userRepository.getActivityCount(userId, 'joinGroup')
  const score = numCreateMeating * 2 + numJoinMeating * 0.5 + numJoinGroup
  console.log('The score is')
  console.log(score)
  if (typeof score === 'undefined') {
    return 'Not Avalible'
  } else if (score === null) {
    return 0
  }
  return score
}

module.exports = { getScore }
