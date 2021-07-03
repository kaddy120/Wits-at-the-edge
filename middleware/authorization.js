
class authorization {
  constructor ({ groupRepository }) {
    this.groupRepository = groupRepository
    this.groupMembers = this.groupMembers.bind(this)
  }

  signedinUsers (req, res, next) {
    if (req.user) {
      next()
    } else {
      req.session.redirectTo = req.path
      res.redirect('/login')
    }
  }

  alreadyLogedin (req, res, next) {
    if (req.user) {
      res.redirect('/')
    } else {
      next()
    }
  }

  async groupMembers (req, res, next) {
    const groups = await this.groupRepository.getUserGroupId(req.user.email)
    const groupIds = groups.map(group => group.groupId)
    if (groupIds.includes(Number(req.params.groupId))) {
      next()
    } else {
      res.status(403).json({ message: 'request to join a group first' })
    }
  }
}

module.exports = authorization
