'use strict'
let num = 0
const cafe = document.getElementById('cafe')
const park = document.getElementById('park')
const library = document.getElementById('library')
const restaurant = document.getElementById('restaurant')


cafe.addEventListener('click', (e) => {
  document.getElementById('address').value = cafe.value
})

park.addEventListener('click', (e) => {
  document.getElementById('address').value = park.value
})

library.addEventListener('click', (e) => {
  document.getElementById('address').value = library.value
})

restaurant.addEventListener('click', (e) => {
  document.getElementById('address').value = restaurant.value
})


