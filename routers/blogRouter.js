const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

router.route('/').post(blogController.create).get(blogController.getAll)
router.route('/tags').post(blogController.blogBasedOnTags)

module.exports = router
