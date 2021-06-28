const list = document.getElementsByClassName('list-group-item')
// const button = document.getElementById('addUser')
// button.style.backgroundColor = '#E8E8E8'

for (let i = 0; i < list.length; i++) {
  list[i].style.backgroundColor = '#E8E8E8'
}

for (const i of list) {
  i.children[1].lastChild.addEventListener('click', async function (e) {
    e.preventDefault()
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = 'Invite Request Succesfully Sent'
  })
}
