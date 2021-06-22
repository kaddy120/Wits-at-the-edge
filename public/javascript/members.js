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

console.log("haa")
for (i of items) {
    i.firstChild.children[1].addEventListener('click', function (e) {
        e.preventDefault()
        const email = this.previousSibling
        const terminator = this.parentNode.id
        console.log(terminator)
        //console.log(this.nextSibling.firstChild.firstChild.children[2].firstChild)
        this.nextSibling.firstChild.firstChild.children[2].firstChild.addEventListener('click', async function (e) {
            e.preventDefault()
            const reason = this.parentNode.previousSibling.firstChild.value
            console.log(terminator)
            try {
                const response = await fetch(`/group/terminate/${email.id}/${terminator}/${reason}`, {
                    method: 'post',
                });
                console.log('Completed!', response);
            } catch (err) {
                console.error(`Error: ${err}`);
            }

        })
    })
}

