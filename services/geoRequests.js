const axios = require('axios')

function getRestaurants (longitude, latitude, place) {
    const places = axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',  {
        params: {
            location: `${latitude}, ${longitude}`,
            radius: 10000,
            type: `${place}`,
            key: 'AIzaSyBQpS8Gb2C1coUXAIMFk-sTGmcclvup-GE'
        }
    }).then(response => {
      let restaurants = []
      for(var i = 0;i < response.data.results.length;i++) {
          restaurants[i] = response.data.results[i].name
      }
       return restaurants
    }).catch(err => {
            console.log(err)
    })

    return places
}

module.exports = {getRestaurants}