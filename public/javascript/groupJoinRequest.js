const list = document.getElementsByClassName('list-group-item')
const declineButton = document.getElementsByClassName('decline')
const acceptButton = document.getElementsByClassName('accept')
// Styling the background and coolors
for (let i = 0; i < declineButton.length; i++) {
  acceptButton[i].style.backgroundColor = '#0066cc'
  declineButton[i].style.backgroundColor = '#ff1515'
}

for (let i = 0; i < list.length; i++) {
  list[i].style.backgroundColor = '#E8E8E8'
}
// Accept Button Response
for (let i = 0; i < list.length; i++) {
  list[i].children[1].firstChild.addEventListener('click', async function (e) {
    e.preventDefault()
    const groupsJoined = this.nextSibling.nextSibling.placeholder
    const userId = this.nextSibling.nextSibling.value
    const joinRequestId = this.nextSibling.nextSibling.name
    const groupId = this.nextSibling.nextSibling.id
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    if (groupsJoined < 10) { this.parentNode.parentNode.innerHTML = `You have succesfully Aceepted an Invite of ${userId}` } else { this.parentNode.parentNode.innerHTML = 'Request declined: You are currently a member of 10 groups' }

    try {
      const response = await fetch(`/joinRequest/${userId}/${groupId}/${joinRequestId}`, {
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
    const joinRequestId = this.previousSibling.previousSibling.name
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
