const router = require('express').Router()
const { check } = require('../helpers/Token')
const { imageUpload } = require('../config/multerConfig')
const PetController = require('../controllers/PetController')


router.post('/register', check, imageUpload.array('images'), PetController.add)

router.get('/', PetController.getAll)
router.get('/mypets', check, PetController.getMy)


module.exports = router