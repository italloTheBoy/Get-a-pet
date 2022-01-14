const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { check } = require('../helpers/Token')
const { imageUpload } = require('../config/multerConfig')


router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/check', UserController.findByToken)
router.get('/:id', UserController.findById)

router.patch('/:id/edit', check, UserController.edit)
router.patch( '/:id/edit/img', check, imageUpload.single('image'), UserController.editImage)


module.exports = router