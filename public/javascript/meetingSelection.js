'use strict'
let num = 0
const cafe = document.getElementById('cafe')
const park = document.getElementById('park')
const library = document.getElementById('library')
const restaurant = document.getElementById('restaurant')
const submit = document.getElementById('submit')
const address = document.getElementById('address')

function geocode(location) {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
          address: location,
          key: 'AIzaSyBQpS8Gb2C1coUXAIMFk-sTGmcclvup-GE'
      }
  }).then(async response => {
            address.value = `${response.data.results[0].address_components[0].short_name} ${response.data.results[0].address_components[1].short_name}, ${response.data.results[0].address_components[2].long_name}, ${response.data.results[0].address_components[7].short_name}`
          }).catch(err => {
          console.log("Enter a valid address")
      })
}

address.addEventListener('input', (e) => {
  if(address.value.length == 0)
  submit.disabled = true
  else{
    submit.disabled = false
    geocode(address.value)
  }
})

function isAddressValid() {

  if(address.value.length == 0 || address.value == 'Meet at a Library' ||
  address.value == 'Meet at a Restaurant' || address.value == 'Meet at a Park'
  || address.value == 'Meet at a Cafe'){
    
     return false
  }
  else return true
}

cafe.addEventListener('click', (e) => {
  document.getElementById('address').value = cafe.value
  if(isAddressValid() == false)
    submit.disabled = true
  else{
    submit.disabled = false
  } 
})

park.addEventListener('click', (e) => {
  document.getElementById('address').value = park.value
  if(isAddressValid() == false)
  submit.disabled = true
else {
  submit.disabled = false
}
})

library.addEventListener('click', (e) => {
  document.getElementById('address').value = library.value
  if(isAddressValid() == false)
  submit.disabled = true
else {
  submit.disabled = false
}
})

restaurant.addEventListener('click', (e) => {
  document.getElementById('address').value = restaurant.value
  if(isAddressValid() == false)
  submit.disabled = true
else {
  submit.disabled = false
} 
})


