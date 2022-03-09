const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/:id', auth, userCtrl.getMyProfile)

router.get('/', auth, userCtrl.getAllProfile)

router.post('/:id', auth, userCtrl.modifyProfile)

router.delete('/:id', auth, userCtrl.deleteProfile)

module.exports = router