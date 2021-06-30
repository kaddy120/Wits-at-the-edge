const items = document.getElementsByClassName('list-group-item')

for (let i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E8E8E8'
}

for (let i = 0; i < items.length; i++) {
  items[i].children[3].firstChild.addEventListener('click', async (e) => {
    e.preventDefault()

    try {
      await fetch(`/meeting/meetingFinished/${items[i].children[3].lastChild.value}/${new Date()}`, { method: 'post' })
    } catch (err) {
      console.log(err)
    }

    items[i].children[3].firstChild.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    items[i].children[3].firstChild.parentNode.parentNode.innerHTML = 'The tracker has started!'
  })
}
