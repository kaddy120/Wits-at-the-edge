const { container } = require('../di-setup')
const votesRepository = container.resolve('votesRepository')

async function joinRequestExpiryDate () {
    const currentDate = await votesRepository.getCurrentDate().then(result => { return result.recordset })
    let requests = await votesRepository.getAllJoinRequests().then(result => { return result.recordset })
    let expiryDate = []
    for(var i = 0;i < requests.length;i++) {
        expiryDate[i] = await votesRepository.getExpiryDate(requests[i].time_Stamp).then(result => { return result.recordset })
    }
    console.log("HERE: ", expiryDate)
}

module.exports = { joinRequestExpiryDate }