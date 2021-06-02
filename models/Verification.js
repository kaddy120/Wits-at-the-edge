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

module.exports = { userFound, canCreateGroup }
