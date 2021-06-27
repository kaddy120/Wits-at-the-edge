function authorization (req, res, next) {
  if (req.user) {
    next()
  } else {
    req.session.redirectTo = req.path
    res.redirect('/login')
  }
}

function alreadyLogedin (req, res, next) {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = { authorization, alreadyLogedin }
