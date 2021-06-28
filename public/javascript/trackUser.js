const trackButton = document.getElementById('trackMe')
const items = document.getElementsByClassName('list-group-item')

for (let i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E8E8E8'
}

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showLocation)
  }
}
function showLocation (position) {
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
}

async function getDistance () {
  // initialize services
  const service = new google.maps.DistanceMatrixService()
  // build request
  const origin1 = { lat: -26.187176441037874, lng: 28.056658129125392 }
  const destinationA = { lat: -29.090481252436405, lng: 26.16187962981649 }
  const destinationB = { lat: -23.837800916119548, lng: 29.484880692072224 }
  const destinationC = { lat: -26.187176441037874, lng: 28.056658129125392 }
  const request = {
    origins: [origin1],
    destinations: [destinationA, destinationB, destinationC],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }
  // put request on page
  console.log(request)
  // get distance matrix response
  service.getDistanceMatrix(request).then((response) => {
    // put response
    console.log(response.rows[0].elements[0].distance.value)
    console.log(response.rows[0].elements[0].distance.text)
  })
}

trackButton.addEventListener('click', () => {
  getLocation()
  getDistance()
})
