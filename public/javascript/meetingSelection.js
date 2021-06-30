'use strict'
let num = 0
const cafe = document.getElementById('cafe')
const park = document.getElementById('park')
const library = document.getElementById('library')
const restaurant = document.getElementById('restaurant')
const submit = document.getElementById('submit')
const address = document.getElementById('address')
const items = document.getElementsByClassName('list-group-item')
const region = document.getElementById('region')

for (var i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E3F9E1'
}

park.style.display = "none"
restaurant.style.display = "none"
cafe.style.display = "none"
library.style.display = "none"

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

  if(address.value.length == 0 || address.value == `${region.innerHTML}, Meet at a Library` ||
  address.value == `${region.innerHTML}, Meet at a Restaurant` || address.value == `${region.innerHTML}, Meet at a Park`
  || address.value == `${region.innerHTML}, Meet at a Cafe`){
    
     return false
  }
  else return true
}

cafe.addEventListener('click', (e) => {
  if(cafe.value == 'Meet at a Cafe') {
    document.getElementById('address').value = ''
    submit.disabled = true
  }
  else {
    document.getElementById('address').value = `${region.innerHTML}, ${cafe.value}`
    submit.disabled = false
  }
  
})

park.addEventListener('click', (e) => {
  if(park.value == 'Meet at a Park') {
    document.getElementById('address').value = ''
    submit.disabled = true
  }
  else { 
    document.getElementById('address').value = `${region.innerHTML}, ${park.value}`
    submit.disabled = false
   }
 
})

library.addEventListener('click', (e) => {
  if(library.value == 'Meet at a Library') {
    document.getElementById('address').value = ''
    submit.disabled = true
  } 
  else { 
  document.getElementById('address').value = `${region.innerHTML}, ${library.value}`
    submit.disabled = false
  }

})

restaurant.addEventListener('click', (e) => {
  if(restaurant.value == 'Meet at a Restaurant') {
    document.getElementById('address').value = ''
    submit.disabled = true
  } 
  else { 
    document.getElementById('address').value = `${region.innerHTML}, ${restaurant.value}`
    submit.disabled = false
   }
 
})

document.getElementById('res').addEventListener('click', (e) => {
  park.style.display = "none"
  restaurant.style.display = ""
  cafe.style.display = "none"
  library.style.display = "none"
})

document.getElementById('lib').addEventListener('click', (e) => {
  park.style.display = "none"
  restaurant.style.display = "none"
  cafe.style.display = "none"
  library.style.display = ""
})

document.getElementById('pak').addEventListener('click', (e) => {
  park.style.display = ""
  restaurant.style.display = "none"
  cafe.style.display = "none"
  library.style.display = "none"
})

document.getElementById('caf').addEventListener('click', (e) => {
  park.style.display = "none"
  restaurant.style.display = "none"
  cafe.style.display = ""
  library.style.display = "none"
})


