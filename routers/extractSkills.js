const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
const Auth = require('../middlewares/auth')

const { Configuration, OpenAIApi } = require("openai");
dotenv.config({ path: './config.env' })

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const router = new express.Router()

router.post('/get-skills', Auth, async (req, res) => {
    try {
        const chatCompletion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: (req.body.text + "\n Extract the skills from the above job description into an array and output just that array")}],
        });

        const jsonString = chatCompletion.data.choices[0].message.content;
        console.log(jsonString);
        const jsonArray = JSON.parse(jsonString);
        console.log(jsonArray);
        return res.status(200).send({
          success: true,
          data: jsonArray,
        });
      } catch (error) {
        return res.status(400).send({
          success: false,
          error: error.response
            ? error.response.data
            : "There was an issue on the server",
        });
      }
})

module.exports = router
