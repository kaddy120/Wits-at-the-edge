'use strict'

function Userfound (users, useremail) {
  const register = users.filter((element) => {
    return element.email === useremail
  })
  if (register.length > 0) {
    return true
  } else { return false }
}

function CanCreateGroup (groups) {
  if (groups.length <= 9) {
    return true
  } else {
    return false
  }
}

module.exports = { Userfound, CanCreateGroup }
