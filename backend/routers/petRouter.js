const router = require('express').Router()
const { check } = require('../helpers/Token')
const PetController = require('../controllers/PetController')


router.post('/register', check, PetController.add)


module.exports = router