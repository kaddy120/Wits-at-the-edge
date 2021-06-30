const meetingId = sessionStorage.getItem('tracking')
const lat = sessionStorage.getItem('userLat')
const long = sessionStorage.getItem('userLong')

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
  // put request on page
  console.log(request)
  // get distance matrix response
  service.getDistanceMatrix(request).then(async (response) => {
    // put response
    // if (response.rows[0].elements[0].distance.value < 1000) { sessionStorage.removeItem('tracking') }
    try {
      await fetch(`/meeting/updateUserDistance/${parseInt(meetingId)}/${response.rows[0].elements[0].distance.value}`, { method: 'post' })
    } catch (err) {
      console.log(err)
    }
  })
}

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation)
  }
}

async function showLocation (position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  console.log(location)
  await getDistance(location, destination)
}

if (meetingId) {
  setInterval(getLocation, 1000 * 60 * 5)
}
