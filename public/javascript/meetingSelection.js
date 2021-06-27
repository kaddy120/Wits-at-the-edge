'use strict'
let num = 0
const onlineButton = document.getElementById('cafe')
//const faceToFaceButton = document.getElementById('face-to-face')

console.log(onlineButton)
onlineButton.addEventListener('click', (e) => {
  document.getElementById('address').value = onlineButton.value
  console.log("new address", document.getElementById('address').value)
 // console.log(onlineButton.value)
})
console.log(onlineButton.value)
/*
faceToFaceButton.addEventListener('click', async function (res, render) {
  console.log("HERE")
  res.render('locations')
})
/*
faceToFaceButton.addEventListener('click', (e) => {
  document.getElementById('submit').disabled = true
  faceToFaceButton.style.background = '#e60000'
  onlineButton.style.background = 'DodgerBlue'
  const div = document.getElementById('address-div')
  const addressLabel = document.createElement('label')
  addressLabel.title = 'Meeting Address'
  addressLabel.id = 'address-label'
  addressLabel.innerText = 'Meeting Address'
  const address = document.createElement('input')
  address.className = 'form-control'
  address.id = 'address'
  address.name = 'address'
  address.type = 'text'
  if (num === 0) {
    div.appendChild(addressLabel)
    div.appendChild(address)
    num++
  }
  const addresslister = document.getElementById('address')

  addresslister.addEventListener('input', (e) => {
    if (addresslister.value !== '') {
      document.getElementById('submit').disabled = false
    } else {
      document.getElementById('submit').disabled = true
    }
  })
})*/
