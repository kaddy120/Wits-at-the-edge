'use strict'
let num = 0
const cafe = document.getElementById('cafe')
const park = document.getElementById('park')
const library = document.getElementById('library')
const restaurant = document.getElementById('restaurant')
const submit = document.getElementById('submit')
const address = document.getElementById('address')

/*
while (address.value.length == 0 || address.value.length != 'Meet at a Library' ||
address.value.length != 'Meet at a Restaurent' || address.value.length != 'Meet at a Park'
|| address.value.length != 'Meet at a Park') {
  submit.disabled = false
}*/
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


