const express = require('express')
const salaryController = require('../controllers/salaryController')

const router = express.Router()

router.route('/').post(salaryController.create).get(salaryController.getAll)

module.exports = router
