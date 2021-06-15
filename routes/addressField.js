const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/address', function (req, res, next) {
    res.render('address', { title: 'Address' , body: req.body})
    console.log(req.body)
})

router.post('/address', async (req, res, next) => {
    const street = req.body.streetAddress
    const suburb = req.body.suburb
    const city = req.body.city
    const zipCode = req.body.zipCode
   axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: `${street}, ${suburb}, ${city}, ${zipCode}`,
            key: 'AIzaSyBQpS8Gb2C1coUXAIMFk-sTGmcclvup-GE'
        }
    }).then(response => { 
        const address = response.data.results[0].formatted_address
          console.log(address)
        })
        .catch(err => {
            err = "Address not found, Enter a valid address"
            console.log(err)
        })
})

module.exports = router