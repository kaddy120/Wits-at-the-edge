
const city = document.getElementById('city')
const street = document.getElementById('streetAddress')
const suburb = document.getElementById('suburb')
const postalCode = document.getElementById('postalCode')

function geocode (location) {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyBQpS8Gb2C1coUXAIMFk-sTGmcclvup-GE'
    }
  }).then(response => {
    const address = response.data.results[0].formatted_address
    const updateStrtNumber = response.data.results[0].address_components[0].short_name
    const updateStrtName = response.data.results[0].address_components[1].short_name
    const updateSuburb = response.data.results[0].address_components[2].long_name
    const updatePostalCode = response.data.results[0].address_components[7].short_name
    suburb.value = updateSuburb
    street.value = `${updateStrtNumber} ${updateStrtName}`
    postalCode.value = updatePostalCode
    document.getElementById('button').disabled = false
  })
    .catch(err => {
      err = 'Address not found, Enter a valid address'
      console.log(err)
    })
}

city.addEventListener('input', function (e) {
  const location = `${street.value}, ${suburb.value}, ${city.value}, ${postalCode.value}`
  geocode(location)
})
