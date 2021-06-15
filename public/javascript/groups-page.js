const buttons = document.querySelectorAll('#req')
buttons.forEach(button => {
  button.addEventListener('click', function (event) {
    const divElement = document.querySelector(`div[id="${this.dataset.groupid}"`)
    // this.removeEventListener('click')
    divElement.innerHTML = '<p>wait for response...</p>'
  })
})
