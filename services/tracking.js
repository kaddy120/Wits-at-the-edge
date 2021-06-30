async function updateDistance () {
  try {
    await fetch('/meeting/calculateDistance', { method: 'get' })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { updateDistance }
