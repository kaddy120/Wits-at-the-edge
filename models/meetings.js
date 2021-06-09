class meeting {
  constructor (meetingId, groupId, meetingTime, agenda, userId) {
    this.meetingId = meetingId
    this.groupId = groupId
    this.meetingTime = meetingTime
    this.agenda = agenda
    this.userId = userId
  }
}

module.exports = meeting
