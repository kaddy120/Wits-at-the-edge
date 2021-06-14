const socket = io()
socket.emit('join', { room: '<%- room.roomname %>' })
const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')

console.log(input)

form.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log(input.value)
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})
socket.emit('join', { groupId })

socket.on('chat message', function (msg) {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})
