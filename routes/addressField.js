const axios = require('axios');
const express = require('express')
const router = express.Router()


router.get('/address/name/:userName/surname/:userSurname/email/:userEmail/school/:schoolName/YOS/:yos/Password/:password', function (req, res, next) {
    res.render('address', { title: 'Fill in Address', name: req.params.userName, surname: req.params.userSurname, email: req.params.userEmail, 
    school: req.params.schoolName, YOS: req.params.yos, password: req.params.password})
})

/*
router.post('/address', async (req, res, next) => {
    const street = req.body.streetAddress
    const suburb = req.body.suburb
    const city = req.body.city
    const zipCode = req.body.zipCode
 
})*/

module.exports = router