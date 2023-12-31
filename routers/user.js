const express = require('express')
const User = require('../models/user')
const Auth = require('../middlewares/auth')

const router = new express.Router()

//signup
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).json({status : "success", data: { user, token}})
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: error
        })
    }
})

//logout
router.post('/users/logout', Auth, async (req, res) => {

    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).json({
            status : "success"
        })
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
