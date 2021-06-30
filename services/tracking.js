const { container } = require('../di-setup')
const meetingRepository = container.resolve('meetingRepository')
const moment = require('moment')

async function updateDistance () {
  const meetings = await meetingRepository.getAllMemberDistances()
  const arrived = meetings.filter((meeting) => {
    return (meeting.distance <= 1600 && meeting.distance !== null)
  })
  if ((meetings.length - arrived.length !== 0)) {
    const duration = moment.duration(moment(new Date()).diff(meetings[0].finishTime))
    const minutes = duration.asMinutes()
    if (minutes >= 5) {
      for (let i = 0; i < meetings.length; i++) {
        const agenda = `${meetings.length - arrived.length} People are still on their way`
        meetingRepository.sendEmail(meetings[i].userId, agenda)
        meetingRepository.updateTime(new Date(), meetings[0].meetingId)
      }
    }
  } else {
    const list = await meetingRepository.getAllMemberDistances()
    if (list.length > 0) {
      for (let i = 0; i < meetings.length; i++) {
        const agenda = 'All People arrived.'
        meetingRepository.sendEmail(meetings[i].userId, agenda)
      }
      meetingRepository.deleteMeeting(meetings[0].meetingId)
    }
  }
}

module.exports = { updateDistance }
