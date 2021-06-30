const socket = io()
socket.emit('join', { room: '<%- room.roomname %>' })
const messages = document.getElementById('messages')
const form = document.getElementById('form')
const input = document.getElementById('input')

console.log(input)

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})
socket.emit('join', { groupId })

socket.on('chat message', function (msg) {
  let class_ = 'msg-left'
  if (msg.userName === 2) {
    class_ = 'msg-right'
  }
  // class_ = 'msg-right'
  const message = `<div class="${class_}">
                   <div class="color-5">${msg.userName}</div>
                   <div class="message">${msg.message}</div>
                   <small>${msg.timeSent}</small>`
  const item = document.createElement('li')
  item.innerHTML = message
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})
