'use strict'
let num = 0
const onlineButton = document.getElementById('online')
const faceToFaceButton = document.getElementById('face-to-face')
onlineButton.addEventListener('click', (e) => {
  onlineButton.style.background = '#e60000'
  faceToFaceButton.style.background = 'DodgerBlue'

  if (num !== 0) {
    const div = document.getElementById('address-div')
    const child = document.getElementById('address-label')
    const child2 = document.getElementById('address')
    div.removeChild(child)
    div.removeChild(child2)
    num = 0
  }

  document.getElementById('submit').disabled = false
})
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
})
