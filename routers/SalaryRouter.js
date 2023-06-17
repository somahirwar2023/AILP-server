const express = require('express')
const SalaryController = require('../controllers/SalaryController')

const router = express.Router()

router.route('/').post(SalaryController.create).get(SalaryController.getAll)

module.exports = router
