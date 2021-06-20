const { container } = require('../di-setup')
const votesRepository = container.resolve('votesRepository')
var moment = require('moment')

async function joinRequestExpiryDate () {
    const currentDate = await votesRepository.getCurrentDate().then(result => { return result.recordset })
    let requests = await votesRepository.getAllJoinRequests().then(result => { return result.recordset })
    
    const filteredRequest = requests.filter(request => {
        return moment().diff(request.time_Stamp, 'hours') > 48
    })

    for(var i = 0;i < filteredRequest.length;i++) {
        await votesRepository.removeFromJoinRequests(filteredRequest[i].requestId)
    }
    
    console.log(filteredRequest)
}

module.exports = { joinRequestExpiryDate }