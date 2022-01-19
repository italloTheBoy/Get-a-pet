const router = require('express').Router()
const { check } = require('../helpers/Token')
const { imageUpload } = require('../config/multerConfig')
const PetController = require('../controllers/PetController')


router.post('/register', check, imageUpload.array('images'), PetController.add)

router.get('/', PetController.getAll)
router.get('/:id', PetController.getById)
router.get('/my/toAdopt', check, PetController.toAdopt)
router.get('/my/adopted', check, PetController.adopted)

router.delete('/:id', check, PetController.delete)


module.exports = router