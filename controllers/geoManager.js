const geoRequests = require('../services/geoRequests')

class locationRepository  {
    constructor ({meetingRepository}) {
        this.meetingRepository = meetingRepository
    }

    async suggestions (req, res) {
      const groupId = 17
      let lat = []
      let long = []
      const coordinates = await meetingRepository.getUserCoordinates().then(result => {return result.recordset})
      for(var i = 0;i < coordinates.length;i++) {
         lat[i] = coordinates[i].lat
         long[i] = coordinates[i].long
      }

      const longitudteMedian = stats.sort(long)
      const latitudeMedian = stats.sort(lat)
      const restaurant = geoRequests(longitudteMedian, latitudeMedian)
     //here
    console.log("restaurants: ", restaurant)
      res.render('locations', {title: 'Location suggestions'})
    }
}