const inputText = document.getElementById('terminateReason')
const items = document.querySelectorAll('#submit')
const temp = document.getElementsByClassName('list-group-item')
// const items = document.getElementsByClassName('list-group-item')

/*
inputText.addEventListener('input', function (e) {
      if(inputText.value.length != 0){
        submit.disabled = false
      }
      else{
        submit.disabled = true
      }
}) */
const names = []
for (var i = 0; i < temp.length; i++) {
  names[i] = temp[i].firstChild.innerHTML
}

for (i of items) {
  i.addEventListener('click', async function (e) {
    e.preventDefault()
    const terminator = this.parentNode.previousSibling.id
    const email = this.parentNode.id
    const reason = this.parentNode.previousSibling.firstChild.value
    try {
      const response = await fetch(`/group/terminate/${email}/${terminator}/${reason}`, {
        method: 'post'
      })
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  })
}
