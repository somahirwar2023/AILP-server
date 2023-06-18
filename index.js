const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
require('module-alias/register')
const AppError  = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const { UNHANDLED_REJECTION_EVENT } = require('./utils/constants')
const userRouter = require('./routers/user')
const extractSkillsRouter = require('./routers/extractSkills')
const companyRouter = require('./routers/companyRouter')
const Company = require('./models/companyModel')
const SalaryRouter = require('./routers/salaryRouter')
const interviewExperienceRouter = require('./routers/interviewExperienceRouter')
const commentRouter = require('./routers/commentRouter')
const blogRouter = require('./routers/blogRouter')

const app = express()
app.use(express.json())

// Loads .env file contents into process.env.
dotenv.config({ path: './config.env' })

app.use(userRouter)
app.use(extractSkillsRouter)
app.use(companyRouter)


app.use("/salary", SalaryRouter);
app.use("/interview-experience", interviewExperienceRouter);
app.use("/comment", commentRouter);
app.use("/blog", blogRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection succesfull')
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })

// STARTING SERVER

const { PORT } = process.env

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

process.on(UNHANDLED_REJECTION_EVENT, (err) => {
  console.log(err.name, err.message)

  console.log('Unhandled rejection ')
  server.close(() => {
    process.exit(1)
  })
})




// app.post("/get-skills", async (req, res) => {
//   try {
//     const chatCompletion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{role: "user", content: data}],
//     });
//     console.log("🚀 ~ file: index.js:84 ~ app.post ~ chatCompletion:", chatCompletion)

//     return res.status(200).send({
//       success: true,
//       data: chatCompletion.data.choices[0].message,
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       error: error.response
//         ? error.response.data
//         : "There was an issue on the server",
//     });
//   }
// });
