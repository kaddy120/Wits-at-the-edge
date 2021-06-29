const filterInput = document.getElementById('filter')

filterInput.addEventListener('input', () =>{
    let filterValue = document.getElementById('filter').value.toUpperCase()

    let ul = document.getElementById('names')
    let li = ul.querySelectorAll('li.list-group-item')
    for(let i=0;i < li.length;i++) {
        let a = li[i].getElementsByTagName('a')[0]
        
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
           li[i].style.display = ''
        } else {
            li[i].style.display = 'none'
        }
    }
    
})