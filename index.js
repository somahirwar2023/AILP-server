const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
require('module-alias/register')
const AppError  = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const { UNHANDLED_REJECTION_EVENT } = require('./utils/constants')
const userRouter = require('./routers/user')
const Company = require('./models/companyModel')
const SalaryRouter = require('./routers/salaryRouter')
const interviewExperienceRouter = require('./routers/interviewExperienceRouter')
const commentRouter = require('./routers/commentRouter')
const blogRouter = require('./routers/blogRouter')

const app = express()
app.use(express.json())


app.use(userRouter)

// Loads .env file contents into process.env.
dotenv.config({ path: './config.env' })

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
