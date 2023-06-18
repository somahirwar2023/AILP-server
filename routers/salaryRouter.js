const express = require('express')
const salaryController = require('../controllers/salaryController')
const Auth = require('../middlewares/auth')
const Salary = require('../models/salaryModel')

const router = express.Router()

router.route('/').post(salaryController.create).get(salaryController.getAll)

router.get('/top-salary', async (req, res) => {
    try{
        const topSalaries = await Salary.find().sort({ "total": -1 }).limit(5)
        res.send(topSalaries)
    } catch(error){
        res.status(500).send(error);
    }
})


module.exports = router
