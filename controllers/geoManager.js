const geoRequests = require('../services/geoRequests')
const stats = require('../models/statistics')

class geoManager{
    constructor ({meetingRepository, groupRepository}) {
        this.meetingRepository = meetingRepository
        this.groupRepository = groupRepository
        this.suggestions = this.suggestions.bind(this)
      }

    async suggestions (req, res) {
      const groupId = 17
      let lat = []
      let long = []
      const coordinates = await this.meetingRepository.getUserCoordinates().then(result => {return result.recordset})
      for(var i = 0;i < coordinates.length;i++) {
         lat[i] = coordinates[i].lat
         long[i] = coordinates[i].long
      }
    coordinates.forEach(function(coordinate, index) {
        lat[index] = coordinate.lat
        long[index] = coordinate.long
    });

      const longitudteMedian = stats.sort(long)
      const latitudeMedian = stats.sort(lat)
      let placeHolder = ['restaurant', 'library', 'park', 'cafe', 'sublocality']
      let place = []
      for(var index = 0; index < 5;index++) {
          place[index] = await geoRequests.getRestaurants(longitudteMedian, latitudeMedian, placeHolder[index])
      }
      
      console.log(place[0])
      res.render('locations', {title: 'Location suggestions', place, groupId: req.params.groupId})
    }
}


module.exports = geoManager