const response = []
const responseC = []
let risky = false
const button = document.getElementById('submit')

button.addEventListener('click', function () {
  // Getting checkbox/radio box elements by Id
  // If the answer is not yes, it's obviously no
  const feverY = document.getElementById('feverYes')
  const feverN = document.getElementById('feverNo')

  const coughY = document.getElementById('coughYes')
  const coughN = document.getElementById('coughNo')

  const throatY = document.getElementById('throatYes')
  const throatN = document.getElementById('throatNo')

  const eyesY = document.getElementById('eyesYes')
  const eyesN = document.getElementById('eyesNo')

  const breathY = document.getElementById('breathYes')
  const breathN = document.getElementById('breathNo')

  const painY = document.getElementById('painYes')
  const painN = document.getElementById('painNo')

  const smellY = document.getElementById('smellYes')
  const smellN = document.getElementById('smellNo')

  const vomitY = document.getElementById('vomitYes')
  const vomitN = document.getElementById('vomitNo')

  const diarrheaY = document.getElementById('diarrheaYes')
  const diarrheaN = document.getElementById('diarrheaNo')

  const fatigueY = document.getElementById('fatigueYes')
  const fatigueN = document.getElementById('fatigueNo')

  const daysY = document.getElementById('daysYes')
  const daysN = document.getElementById('daysNo')

  const exposureY = document.getElementById('exposureYes')
  const exposureN = document.getElementById('exposureNo')

  const chronicY = document.getElementById('chronicYes')
  const chronicN = document.getElementById('chronicNo')

  const ageY = document.getElementById('ageYes')
  const ageN = document.getElementById('ageNo')

  // Empty textboxes are not allowed

  // Section A of the form
  if (feverY.checked === true) response.push('yes')
  else if (feverN.checked === true) response.push('no')

  if (coughY.checked === true) response.push('yes')
  else if (coughN.checked === true) response.push('no')

  if (throatY.checked === true) response.push('yes')
  else if (throatN.checked === true)response.push('no')

  if (eyesY.checked === true) response.push('yes')
  else if (eyesN.checked === true) response.push('no')

  if (breathY.checked === true) response.push('yes')
  else if (breathN.checked === true) response.push('no')

  if (painY.checked === true) response.push('yes')
  else if (painN.checked === true) response.push('no')

  if (smellY.checked === true) response.push('yes')
  else if (smellN.checked === true) response.push('no')

  if (vomitY.checked === true) response.push('yes')
  else if (vomitN.checked === true) response.push('no')

  if (diarrheaY.checked === true) response.push('yes')
  else if (diarrheaN.checked === true)response.push('no')

  if (fatigueY.checked === true) response.push('yes')
  else if (fatigueN.checked === true) response.push('no')

  // Section B of the form
  if (daysY.checked === true) response.push('yes')
  else if (daysN.checked === true)response.push('no')

  if (exposureY.checked === true) response.push('yes')
  else if (exposureN.checked === true)response.push('no')

  // section C of the form
  if (chronicY.checked === true) responseC.push('yes')
  else if (chronicN.checked === true)responseC.push('no')

  if (ageY.checked === true) responseC.push('yes')
  else if (ageN.checked === true)responseC.push('no')

  // Evaluate textBoxes

  // Evaluate The Form
  if (response.length === 12 && responseC.length === 2) {
    console.log('complete Form')
    for (let i = 0; i < response.length; i++) {
      if (response[i] === 'yes') {
        risky = true
        window.alert('You are high risk, do not attempt to enter the University Premises!')
        break
      }
    }
  } else {
    console.log('Incomplete Form')
    risky = true // Did not complete form
    window.alert('Incomplete Form')
    return false
  }
  if (risky === false) window.alert('Access allowed, please follow necessary precautions')
  console.log(risky)
}, false)
