const express = require('express')
const router = express.Router()
const { container } = require('../di-setup')
const userRepo = container.resolve('userRepository')
const constants = require('../constants')
const verify = require('../models/verification')

router.get('/inviteUser', function (req, res, next) {
  // res.render('inviteUser', { title: 'Invite Users To A Group' })
  res.render('inviteUser', constants)
})

router.post('/inviteUser', async function (req, res, next) {
  // Get search filter inputs
  const firstName = req.body.searchBarfName
  const surname = req.body.searchBarSurname
  const yearOfStudy = req.body.yearOfStudy
  const school = req.body.school

  const evaluate = verify.searchFilterOptions(firstName, surname, yearOfStudy, school)
  if (evaluate === 0) {
    // Filter by name only
    const usersToInvite = await userRepo.getUserByfName(firstName)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/inviteUsers')
    console.log(usersToInvite)
  } else if (evaluate === 1) {
    // Filter by Surname only
    const usersToInvite = await userRepo.getUserBySurname(surname)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 2) {
    // Filter by year Of Study Only
    const usersToInvite = await userRepo.getUserByYOS(yearOfStudy)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 3) {
    const usersToInvite = await userRepo.getUserBySchool(school)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
    console.log(usersToInvite)
  } else if (evaluate === 4) {
    const usersToInvite = await userRepo.getUserByFullNameYOSschool(firstName, surname, yearOfStudy, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 12) {
    const usersToInvite = await userRepo.getUserByfNameSurname(firstName, surname)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 13) {
    const usersToInvite = await userRepo.getUserByfNameYOS(firstName, yearOfStudy)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 14) {
    const usersToInvite = await userRepo.getUserByfNameSchool(firstName, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 23) {
    const usersToInvite = await userRepo.getUserBySurnameYOS(surname, yearOfStudy)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 24) {
    const usersToInvite = await userRepo.getUserBySurnameSchool(surname, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 34) {
    const usersToInvite = await userRepo.getUserByYOSschool(yearOfStudy, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 123) {
    const usersToInvite = await userRepo.getUserByfNameSurnameYOS(firstName, surname, yearOfStudy)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 124) {
    const usersToInvite = await userRepo.getUserByfNameSurnameSchool(firstName, surname, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 134) {
    const usersToInvite = await userRepo.getUserByfNameYosSchool(firstName, yearOfStudy, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else if (evaluate === 234) {
    const usersToInvite = await userRepo.getUserBySurnameYosSchool(surname, yearOfStudy, school)
    console.log(usersToInvite)
    if (usersToInvite.length > 0) res.render('inviteUserRequest', { users: usersToInvite, groupId: 58 })
    else res.redirect('/')
  } else {
    res.redirect('/')
  }
  // res.send('Hello World')
})
router.post('/inviteUser/:userId/:groupId', async function (req, res, next) {
  const userId = req.params.userId
  const groupId = req.params.groupId
  await userRepo.addJoinRequest(userId, groupId)
  console.log('Request sent')
  return res.sendStatus(200)
})

module.exports = router
