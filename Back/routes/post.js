const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.get('/', postCtrl.getAllPosts)

router.post('/', auth, multer, postCtrl.createPost)

router.delete('/:id', auth, postCtrl.deletePost)

router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router