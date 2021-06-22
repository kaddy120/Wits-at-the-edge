const inputText = document.getElementById('terminateReason')
const submit = document.getElementById('submit')
const items = document.getElementsByClassName('list-group-item')
console.log(items[0].firstChild.children[1].nextSibling)

inputText.addEventListener('input', function (e) {
      e.preventDefault()
      if(inputText.value.length != 0){
        submit.disabled = false
      } 
      else submit.disabled = true
})


for (i of items) {
    i.firstChild.children[1].addEventListener('click', function (e) {
        e.preventDefault()
        const email = this.previousSibling
        this.nextSibling.firstChild.firstChild.children[2].firstChild.addEventListener('click', async function (e) {
            e.preventDefault()
            const reason = this.parentNode.previousSibling.firstChild.value
            try {
                const response = await fetch(`/group/terminate/${email.id}/${reason}`, {
                    method: 'post',
                });
                console.log('Completed!', response);
            } catch (err) {
                console.error(`Error: ${err}`);
            }

        })
    })
}

