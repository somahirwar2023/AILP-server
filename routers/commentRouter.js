const express = require('express')
const commentController = require('../controllers/commentController')

const router = express.Router()

router.route('/').post(commentController.create).get(commentController.getAll)

module.exports = router
