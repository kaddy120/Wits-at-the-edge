'use strict'

function userFound (users, userEmail) {
  const register = users.filter((element) => {
    return element.email === userEmail
  })
  if (register.length > 0) {
    return true
  } else { return false }
}

function canCreateGroup (groups) {
  if (groups.length <= 9) {
    return true
  } else {
    return false
  }
}

function searchFilterOptions (firstName, surname, yearOfStudy, school) {
  const results = []
  let sum = 0
  let position = -1
  // Which inputs are chosen
  if (firstName !== '') {
    results.push(1)
  } else results.push(0)
  if (surname !== '') {
    results.push(1)
  } else results.push(0)
  if (yearOfStudy !== 'Select your year of study') {
    results.push(1)
  } else results.push(0)
  if (school !== 'Select your field of study') {
    results.push(1)
  } else results.push(0)

  // Check which inputs are valid
  for (let i = 0; i < results.length; i++) {
    sum += results[i]
  }

  // Sum can be a maximum of 4(Number of options chosen)
  if (sum === 0) {
    return position // Return -1 no options is chosen, error!
  } else if (sum === 1) {
    position = results.indexOf(1) // Return of 0,1,2,3 gives an option which is searched by
    return position
  } else if (sum === 2) {
    // Need to find the combinations to filter by && Need to find the combinations to filter by
    if (results[0] === 1 && results[1] === 1) {
      position = 12
      return position
    } else if (results[0] === 1 && results[2] === 1) {
      position = 13
      return position
    } else if (results[0] === 1 && results[3] === 1) {
      position = 14
      return position
    } else if (results[1] === 1 && results[2] === 1) {
      position = 23
      return position
    } else if (results[1] === 1 && results[3] === 1) {
      position = 24
      return position
    } else if (results[2] === 1 && results[3] === 1) {
      position = 34
      return position
    }
  } else if (sum === 3) { // Need to find the 6 combinations to filter by
    if (results[0] === 1 && results[1] === 1 && results[2] === 1) {
      position = 123 // Textbox 1, 2 && 3
      return position
    } else if (results[0] === 1 && results[1] === 1 && results[3] === 1) {
      position = 124 // Textbox 1 2 and 4
      console.log(position)
      return position
    } else if (results[0] === 1 && results[2] === 2 && results[3] === 1) {
      position = 134 // Textbox 1 3 and 4
      return position
    } else if (results[1] === 1 && results[2] === 2 && results[3] === 1) {
      position = 234
      return position
    }
  } else if (sum === 4) {
    return 4 // Search and filter by all options
  }
}
function getGroupName (myRequest, groupNames) {
  const getNames = []

  for (let x = 0; x < myRequest.length; x++) {
    for (let i = 0; i < groupNames.length; i++) {
      if (myRequest[x].groupId === groupNames[i].groupId) getNames.push(groupNames[i].groupName)
    }
  }

  return getNames
}
module.exports = { userFound, canCreateGroup, searchFilterOptions, getGroupName }
