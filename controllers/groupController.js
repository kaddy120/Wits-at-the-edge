class userManager {
  constructor ({ userRepository }) {
    this.userRepository = userRepository
    this.postUser = this.postUser.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  
}

module.exports = userManager
