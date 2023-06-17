const express = require('express')
const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const router = new express.Router()

router.post('/get-skills', async (req, res) => {
    try{
        // const options = {
        //     method: 'POST',
        //     url: 'https://emsiservices.com/skills/versions/latest/extract/trace',
        //     qs: {language: 'fr'},
        //     headers: {Authorization: `Bearer ${process.env.EMSI_TOKEN}`, 'Content-Type': 'application/json'},
        //     body: {
        //       text: req.body.text,
        //     },
        //     json: true
        //   };
        const options = {
            method: 'POST',
            url: 'https://auth.emsicloud.com/connect/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
              client_id: 'gkzp3ralsv1frw5y',
              client_secret: 'rf2OEQMK',
              grant_type: 'client_credentials',
              scope: 'emsi_open'
            }
          };


        axios.request(options)
        .then((data) => {
            res.send(data);
        })
        .catch(error)
            res.send("Error");


        // res.send(data)
    }catch (error){
        res.status(500).send("Skills extraction failed. \n Please try again!")
    }
})

module.exports = router
