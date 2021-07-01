const items = document.getElementsByClassName('list-group-item')
const inputs = document.getElementsByClassName('useraddress')
const groupIds = document.getElementsByClassName('groupId')

for (let i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E8E8E8'
}

for (let i = 0; i < items.length; i++) {
  items[i].children[3].firstChild.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
      const finished = { finishtime: new Date() }
      await fetch(`/group/${groupIds[i].defaultValue}/meeting/meetingFinished/${items[i].children[3].lastChild.value}`, {
        method: 'post',
        body: JSON.stringify(finished),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      await fetch(`/group/${groupIds[i].defaultValue}/meeting/${items[i].children[3].lastChild.id}/meetingFinished`, { method: 'post' })
      sessionStorage.setItem('tracking', `${items[i].children[3].lastChild.value}`)
      sessionStorage.setItem('userLat', inputs[i].defaultValue)
      sessionStorage.setItem('userLong', inputs[i].id)
      sessionStorage.setItem('groupId', groupIds[i].defaultValue)
    } catch (err) {
      console.log(err)
    }

    items[i].children[3].firstChild.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    items[i].children[3].firstChild.parentNode.parentNode.innerHTML = 'The tracker has started! Please do not log out for tracking to be effective'
  })
}
