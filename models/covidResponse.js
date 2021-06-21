'use strict'

function covidResponse (requestBody) {
  const response = []
  const responseC = []
  let risky = false

  // Getting checkbox/radio box elements by Id
  // If the answer is not yes, it's obviously no
  const feverY = requestBody.feverYes
  const feverN = requestBody.feverNo

  const coughY = requestBody.coughYes
  const coughN = requestBody.coughNo

  const throatY = requestBody.throatYes
  const throatN = requestBody.throatNo

  const eyesY = requestBody.eyesYes
  const eyesN = requestBody.eyesNo

  const breathY = requestBody.breathYes
  const breathN = requestBody.breathNo

  const painY = requestBody.painYes
  const painN = requestBody.painNo

  const smellY = requestBody.smellYes
  const smellN = requestBody.smellNo

  const vomitY = requestBody.vomitYes
  const vomitN = requestBody.vomitNo

  const diarrheaY = requestBody.diarrheaYes
  const diarrheaN = requestBody.diarrheaNo

  const fatigueY = requestBody.fatigueYes
  const fatigueN = requestBody.fatigueNo

  const daysY = requestBody.daysYes
  const daysN = requestBody.daysNo

  const exposureY = requestBody.exposureYes
  const exposureN = requestBody.exposureNo

  const chronicY = requestBody.chronicYes
  const chronicN = requestBody.chronicNo

  const ageY = requestBody.ageYes
  const ageN = requestBody.ageNo

  // Empty textboxes are not allowed

  // Section A of the form
  if (feverY === 'on') response.push('yes')
  else if (feverN === 'on') response.push('no')

  if (coughY === 'on') response.push('yes')
  else if (coughN === 'on') response.push('no')

  if (throatY === 'on') response.push('yes')
  else if (throatN === 'on')response.push('no')

  if (eyesY === 'on') response.push('yes')
  else if (eyesN === 'on') response.push('no')

  if (breathY === 'on') response.push('yes')
  else if (breathN === 'on') response.push('no')

  if (painY === 'on') response.push('yes')
  else if (painN === 'on') response.push('no')

  if (smellY === 'on') response.push('yes')
  else if (smellN === 'on') response.push('no')

  if (vomitY === 'on') response.push('yes')
  else if (vomitN === 'on') response.push('no')

  if (diarrheaY === 'on') response.push('yes')
  else if (diarrheaN === 'on')response.push('no')

  if (fatigueY === 'on') response.push('yes')
  else if (fatigueN === 'on') response.push('no')

  // Section B of the form
  if (daysY === 'on') response.push('yes')
  else if (daysN === 'on')response.push('no')

  if (exposureY === 'on') response.push('yes')
  else if (exposureN === 'on')response.push('no')

  // section C of the form
  if (chronicY === 'on') responseC.push('yes')
  else if (chronicN === 'on')responseC.push('no')

  if (ageY === 'on') responseC.push('yes')
  else if (ageN === 'on')responseC.push('no')

  // Evaluate textBoxes

  // Evaluate The Form
  if (response.length === 12 && responseC.length === 2) {
    for (let i = 0; i < response.length; i++) {
      if (response[i] === 'yes') {
        risky = true
        return 'true'
      }
    }
  } else {
    risky = true // Did not complete form
    return 'incomplete'
  }
  if (risky === false) {
    return 'false'
  }
}

module.exports = { covidResponse }
