class simpleRecommendationEngine {
  constructor ({ userRepository, groupRepository }) {
    this.userRepository = userRepository
    this.groupRepository = groupRepository
    this.mutualFrinedUserId = this.mutualFrinedUserId.bind(this)
    this.recommendGroups = this.recommendGroups.bind(this)
  }

  // randomly select mutual friend so that you can vary
  // the recommendation
  async mutualFrinedUserId (userId) {
    const mutualFriends = await this.userRepository.userMutualFriends(userId)
    const relationships = mutualFriends.length
    if (relationships > 0) {
      const relation = mutualFriends[Math.floor(Math.random() * relationships)]
      if (relation.userId1 !== userId) {
        return relation.userId1
      } else { return relation.userId2 }
    }
  }

  // not the best way but it should work for now
  async recommendGroups (user) {
    try {
      const mutualFriendId = await this.mutualFrinedUserId(user.email)
      const groups = await this.groupRepository.getUserGroups(mutualFriendId)
      if (groups.length < 4) {
        const moreGroups = await this.groupRepository.filterByYOSSchoolUser(user.YSO, user.school, user.email)
        const moreGroupLength = moreGroups.length
        for (let i = 0; i < 4; i++) {
          groups.push(moreGroups[Math.floor(Math.random() * moreGroupLength)])
        }
      }
      return groups
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = simpleRecommendationEngine
