const input = document.getElementsByClassName('distance')
const input1 = document.getElementsByClassName('distance1')
console.log(input)
const destination = {
  lat: parseFloat(input1.useraddress.defaultValue),
  lng: parseFloat(input1.useraddress.id)
}
console.log(destination)
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

    console.log(response.rows[0].elements[0].distance.value)
    try {
      await fetch(`/meeting/updateUserDistance/${parseInt(input.distance.id)}/${response.rows[0].elements[0].distance.value}`, { method: 'post' })
    } catch (err) {
      console.log(err)
    }
  })
}

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showLocation)
  }
}

async function showLocation (position) {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  await getDistance(location, destination)
}

getLocation()
