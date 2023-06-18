const express = require('express')
const dotenv = require('dotenv')
const Company = require('../models/companyModel')
const Auth = require('../middlewares/auth')

dotenv.config({ path: './config.env' })

const router = new express.Router()

router.post('/company', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save()
        res.status(201).send(company)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/company', async (req, res) => {
    try {
        const companies = await Company.find({})
        res.status(200).send(companies)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
