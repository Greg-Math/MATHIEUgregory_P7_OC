const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/comment')
const auth = require('../middleware/auth')

router.get('/:postid', postCtrl.getComment)

router.post('/:postid', auth, postCtrl.createComment)

router.delete('/:postid/:commentid', auth, postCtrl.deleteComment)

module.exports = router