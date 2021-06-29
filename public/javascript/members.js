const submitBtn = document.getElementById('submit')
const inputText = document.getElementById('terminateReason')


inputText.addEventListener('input', (e) => {
    if(inputText.value.length == 0){
        submitBtn.disabled = true
    } else submitBtn.disabled = false
})
submitBtn.addEventListener('click', async (e) => {
    console.log(inputText.value)
    try {
            await fetch(`/group/${groupId}/terminate/${memberToLeave}/${terminator}/${inputText.value}`, {
            method: 'post',
        });
        
    } catch (err) {
        console.error(`Error: ${err}`);
    }
})