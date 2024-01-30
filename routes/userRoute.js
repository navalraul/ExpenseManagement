const express = require('require')
const { loginController, registerController } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginController)

router.post('/register', registerController)

module.exports = router