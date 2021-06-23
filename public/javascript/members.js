const inputText = document.getElementById('terminateReason')
const items = document.querySelectorAll('#submit')
const temp = document.getElementsByClassName('list-group-item')
//const items = document.getElementsByClassName('list-group-item')
console.log(temp[0].firstChild.innerHTML )

/*
inputText.addEventListener('input', function (e) {
      if(inputText.value.length != 0){
        submit.disabled = false
      } 
      else{
        submit.disabled = true
      } 
})*/
let names = []
for(var i = 0;i < temp.length;i++){
    names[i] = temp[i].firstChild.innerHTML
}

console.log(names)


for (i of items) {
    i.addEventListener('click', async function (e) {
       console.log(this)
        e.preventDefault()
        const terminator = this.parentNode.previousSibling.id
        console.log(terminator)
        const email = this.parentNode.id
        console.log(email)
        const reason = this.parentNode.previousSibling.firstChild.value
        console.log(reason)
        try {
            const response = await fetch(`/group/terminate/${email}/${terminator}/${reason}`, {
                method: 'post',
            });
            console.log('Completed!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }

    })
}

