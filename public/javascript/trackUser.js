const items = document.getElementsByClassName('list-group-item')
const inputs = document.getElementsByClassName('useraddress')

for (let i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E8E8E8'
}

for (let i = 0; i < items.length; i++) {
  items[i].children[3].firstChild.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
      await fetch(`/meeting/meetingFinished/${items[i].children[3].lastChild.value}/${new Date()}`, { method: 'post' })
      await fetch(`/meeting//meetings/${items[i].children[3].lastChild.id}/meetingFinished`, { method: 'post' })
      sessionStorage.setItem('tracking', `${items[i].children[3].lastChild.value}`)
      sessionStorage.setItem('userLat', inputs[i].defaultValue)
      sessionStorage.setItem('userLong', inputs[i].id)
    } catch (err) {
      console.log(err)
    }

    items[i].children[3].firstChild.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    items[i].children[3].firstChild.parentNode.parentNode.innerHTML = 'The tracker has started!'
  })
}
