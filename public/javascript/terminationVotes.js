const items = document.getElementsByClassName('list-group-item')


for (i of items) {
    i.children[2].lastChild.addEventListener("click", async function (e) {
        e.preventDefault()
        this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
        this.parentNode.parentNode.innerHTML = 'You declined this terminate request!'
        console.log(this.previousSibling.previousSibling.id)
        try {
            const response = await fetch(`/group/${this.previousSibling.previousSibling.id}/vote/${this.id}/${this.parentNode.id}/${-1}`, {
                method: 'post',
            });
            console.log('Completed!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    })


    i.children[2].firstChild.addEventListener("click", async function (e) {
        e.preventDefault()

        this.parentNode.parentNode.style.backgroundColor = '#E8E8E8'
        this.parentNode.parentNode.innerHTML = 'You accepted this terminate request!'
        console.log(this.nextSibling.nextSibling.id)
                                        
        try {
            const response = await fetch(`/group/${this.id}/vote/${this.nextSibling.nextSibling.id}/${this.parentNode.id}/${1}`, {
                method: 'post',
            });
            console.log('Completed!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    })
}





