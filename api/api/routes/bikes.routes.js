const express = require('express')
const bikesControllers = require('../controllers/bikesControllers')

const router = express.Router()

router.get('/', bikesControllers.getBikes)

router.get('/:id', bikesControllers.getBikesById)

router.post('/bike', bikesControllers.postBike)

router.delete('/Bike/:id', bikesControllers.deleteBike)

router.put('/bike/marca/:id', bikesControllers.putBike);

module.exports = router