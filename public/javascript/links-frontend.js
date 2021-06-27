const topic = ''
const addLinkButton = document.getElementById('add-topic')
const topicInput = document.getElementById('topic')
const baseURL = 'https://localhost:3000'

topicInput.addEventListener('onchange', event => {
  console.log(event)
})
addLinkButton.addEventListener('click', event => {
  event.preventDefault()
  const request = new Request('/group/topic',
    {
      method: 'POST',
      body: JSON.stringify({
        groupId: 2,
        topic: topicInput.value
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

  fetch(request)
    .then(response => {
      if (response.status === 201) {
        const result = response.json()
      } else {
        throw new Error('Something went wrong on api server!')
      }
    })
    .then(response => {
      console.debug(response)
    // ...
    }).catch(error => {
      console.error(error)
    })
})
