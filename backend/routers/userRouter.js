const router = require('express').Router()
const UserController = require('../controllers/UserController')


router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/check', UserController.findByToken)
router.get('/:id', UserController.findById)

router.patch('/edit/id', UserController.edit)


module.exports = router