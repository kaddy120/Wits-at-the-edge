function authorization (req, res, next) {
  if (req.session) {
    next()
  } else {
    res.redirect('/login')
  }
}

function alreadyLogedin (req, res, next) {
  if (req.session) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = { authorization, alreadyLogedin }
