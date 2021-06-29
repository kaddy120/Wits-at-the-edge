const inputText = document.getElementById('terminateReason')
//const items = document.querySelectorAll('#submit')
const Items = document.getElementsByClassName('list-group-item')
console.log(Items[1].lastChild.firstChild.firstChild.lastChild.firstChild)
let things = []

for(var i = 0;i < Items.length;i++){
    things[i] = Items[i].lastChild.firstChild.firstChild.lastChild.firstChild
}

console.log(things.length)


for (i of things)  {
    console.log(i)
    i.addEventListener('click', (e) =>{
        console.log(this)
    })
}

/*
inputText.addEventListener('input', function (e) {
      if(inputText.value.length != 0){
        submit.disabled = false
      } 
      else{
        submit.disabled = true
      } 
})*/
/*
console.log(groupId)


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
            const response = await fetch(`/group/${groupId}/terminate/${email}/${terminator}/${reason}`, {
                method: 'post',
            });
            console.log('Completed!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }

    })
}

*/