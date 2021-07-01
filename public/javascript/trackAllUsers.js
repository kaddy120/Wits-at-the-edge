const meetingId = sessionStorage.getItem('tracking')
const lat = sessionStorage.getItem('userLat')
const long = sessionStorage.getItem('userLong')
const groupId = sessionStorage.getItem('groupId')
const destination = {
  lat: parseFloat(lat),
  lng: parseFloat(long)
}

async function getDistance (origin1, destinationA) {
  // initialize services
  const service = new google.maps.DistanceMatrixService()
  // build request
  const request = {
    origins: [origin1],
    destinations: [destinationA],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }
  // get distance matrix response
  service.getDistanceMatrix(request).then(async (response) => {
    if (response.rows[0].elements[0].distance.value < 300) { sessionStorage.removeItem('tracking') }
    try {
      await fetch(`/group/${groupId}/meeting/updateUserDistance/${parseInt(meetingId)}`, {
        method: 'post',
        body: JSON.stringify({ distance: response.rows[0].elements[0].distance.value }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      console.log(err)
    }
  })
}

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation) /// get the current user location
  }
}

async function showLocation (position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  await getDistance(location, destination)
}

if (meetingId) {
  setInterval(getLocation, 1000 * 60 * 5)
}
