const items = document.getElementsByClassName('list-group-item')

for (var i = 0; i < items.length; i++) {
  items[i].style.backgroundColor = '#E8E8E8'
}

for (i of items) {
  i.children[1].lastChild.addEventListener('click', async function (e) {
    e.preventDefault()
    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = 'You declined this join request!'
    try {
      const response = await fetch(`/vote/${this.previousSibling.previousSibling.value}/${this.previousSibling.previousSibling.id}/voteChoice/-1`, {
        method: 'post'
      })
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })

  i.children[1].firstChild.addEventListener('click', async function (e) {
    e.preventDefault()

    this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
    this.parentNode.parentNode.innerHTML = 'You accepted this join request!'
    try {
      const response = await fetch(`/vote/${this.nextSibling.nextSibling.value}/${this.nextSibling.nextSibling.id}/voteChoice/1`, {
        method: 'post'
      })
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })
}
