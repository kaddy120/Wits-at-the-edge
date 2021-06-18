const items = document.getElementsByClassName('list-group-item')

for(i of items) {
    i.children[1].lastChild.addEventListener("click", function (e) {
        e.preventDefault()
        this.parentNode.parentNode.remove()
    })
    i.children[1].firstChild.addEventListener("click", function(e) {
        e.preventDefault()
        console.log("here")
        this.parentNode.parentNode.style.backgroundColor = '#90ee90'
        this.parentNode.parentNode.innerHTML = 'Successfully voted!!'
    })
}

   



