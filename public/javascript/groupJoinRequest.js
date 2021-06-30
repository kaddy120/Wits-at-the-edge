const list = document.getElementsByClassName('list-group-item')

for (let i = 0; i < list.length; i++) {
  list[i].style.backgroundColor = '#E8E8E8'
}
// Accept Button Response
for (let i = 0; i < list.length; i++) {
  list[i].children[1].firstChild.addEventListener('click', async function (e) {
    e.preventDefault()
    const userId = this.nextSibling.nextSibling.value
    const groupId = this.nextSibling.nextSibling.id
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = `You have succesfully Aceepted an Invite of ${userId}`

    try {
      const response = await fetch(`/joinRequest/${userId}/${groupId}`, {
        method: 'POST'

      })
      console.log('Completed!', response)
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })
}

// Decline Button Response
for (let i = 0; i < list.length; i++) {
  list[i].children[1].lastChild.addEventListener('click', async function (e) {
    e.preventDefault()
    const userId = this.previousSibling.previousSibling.value
    const joinRequestId = this.previousSibling.previousSibling.id
    console.log('joinRequest Id')
    console.log(joinRequestId)
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = `You have succesfully Declined an Invite of ${userId}`

    try {
      const response = await fetch(`/declineRequest/${userId}/${joinRequestId}`, {
        method: 'POST'

      })
      console.log('Completed!', response)
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })
}
