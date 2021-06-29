const topic = ''
const addTopicButton = document.getElementById('add-topic')
const addLink = document.querySelectorAll('#add-link')
const saveEditChanges = document.querySelector('button[id="save-link-edit"]')
const topicInput = document.getElementById('topic')
const editOrAddLink = ''

const baseURL = 'https://localhost:3000'
const deleteButtons = document.querySelectorAll('#delete')
const editButtons = document.querySelectorAll('#edit')

let linkEdited = ''
let url = ''
const addLinkToTopicId = ''
let topicId

const linkURL = document.getElementById('link-url')
const linkTitle = document.getElementById('link-title')

addLink.forEach(button => {
  button.addEventListener('click', function (event) {
    saveEditChanges.innerHTML = '+ Link'
    method = 'POST'
    topicId = this.getAttribute('data-topicid')
    linkTitle.value = ''
    linkURL.value = ''
    url = `/group/${groupId}/link`
    console.log(addLinkToTopicId)
    console.log('lets add a new link')
  })
})

editButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    saveEditChanges.innerHTML = 'Save changes'
    linkEdited = this.getAttribute('data-linkId')
    const currentLink = document.querySelector(`a[data-linkId="${linkEdited}"]`)
    linkTitle.value = currentLink.innerHTML
    linkURL.value = currentLink.getAttribute('data-url')
    url = `/group/${groupId}/link/${linkEdited}`
  })
})

// for both adding and editing links
saveEditChanges.addEventListener('click', event => {
  const element = document.querySelector('input[name="topicId"]')
  element.value = topicId
  const myForm = document.getElementById('linkForm')
  myForm.setAttribute('action', url)
  myForm.submit()
})

addTopicButton.addEventListener('click', event => {
  const myForm = document.getElementById('topicForm')
  myForm.setAttribute('action', `/group/${groupId}/topic`)
  myForm.submit()
})

deleteButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    const id = this.getAttribute('data-linkId')
    const request = new Request(`/group/${groupId}/link/${id}`,
      {
        method: 'Delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    const li = document.querySelector(`li[data-linkid="${id}"]`)
    const ul = li.parentElement
    ul.removeChild(li)
    fetch(request)
      .then(response => {
        if (response.status === 201) {
          console.log('item is removed')
        } else {
          throw new Error('Something went wrong on api server!')
        }
      }).catch(error => {
        console.error(error)
      })
  })
})

function createRequest (url_, method_, body_) {
  return new Request(url_,
    {
      method: method_,
      body: JSON.stringify(body_),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
}
