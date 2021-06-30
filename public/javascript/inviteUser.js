const list = document.getElementsByClassName('list-group-item')


for (let i = 0; i < list.length; i++) {
  list[i].style.backgroundColor = '#E8E8E8'
}

for (let i = 0; i < list.length; i++) {
  list[i].children[1].firstChild.addEventListener('click', async function (e) {
    e.preventDefault()
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = 'Invite Request Succesfully Sent'
    const userId = this.nextSibling.nextSibling.value
    const groupId = this.nextSibling.nextSibling.id
    console.log(userId)
    console.log(groupId)
    try {
      const response = await fetch(`/inviteUser/${userId}/${groupId}`, {
        method: 'POST'
      })
      console.log('Completed!', response)
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })
}
