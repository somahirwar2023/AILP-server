const express = require('express')
const interviewExperienceController = require('../controllers/interviewExperienceController')

const router = express.Router()

router.route('/').post(interviewExperienceController.create).get(interviewExperienceController.getAll)


module.exports = router
