const items = document.getElementsByClassName('list-group-item')
console.log(items[0].lastChild)

for (i of items) {
    i.lastChild.addEventListener("click", async function (e) {
        e.preventDefault()
        this.parentNode.appendChild(form);
        try {
            const response = await fetch(`#`, {
                method: 'get',
            });
            console.log('Completed!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    })
}