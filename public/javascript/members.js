const inputText = document.getElementById('terminateReason')
const submit = document.getElementById('submit')
console.log(inputText)

inputText.addEventListener('input', function (e) {
      e.preventDefault()
      if(inputText.value.length != 0){
        submit.disabled = false
      } 
      else submit.disabled = true
})

submit.addEventListener('click', function (e) {
    
})