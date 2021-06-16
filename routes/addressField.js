const axios = require('axios');
const express = require('express')
const router = express.Router()


router.get('/address', function (req, res, next) {
    res.render('address', { title: 'Fill in address'})
})

/*
router.post('/address', async (req, res, next) => {
    const street = req.body.streetAddress
    const suburb = req.body.suburb
    const city = req.body.city
    const zipCode = req.body.zipCode
 
})*/

module.exports = router