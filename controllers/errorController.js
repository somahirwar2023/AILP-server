const { AppError } = require('../utils/appError')
const {
  CAST_ERROR,
  VALIDATION_ERROR,
  DUPLICATE_FIELD_ERROR_CODE,
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ERROR,
} = require('../utils/constants')

const handelCastErrorDb = (err) => {
  // handeling cast error
  const message = `Invalid ${err.path} : ${err.value}`
  return new AppError(message, 404)
}

const handelDuplicateFieldsDB = (err) => {
  // handeling duplicate field error
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value ${value}. Please use another value`
  return new AppError(message, 400)
}

const handelValidationErrorDb = (err) => {
  // handling validation error
  const errors = Object.values(err.errors).map((error) => error.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  // sending error in devlopment mode
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  // sending error in production mode
    // operational error , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
    // programming or other unknown error
  } else {
    console.error('error -> ', err)

    res.status(500).json({
      status: 'error',
      message: 'Oops it seems there is something wrong !!!',
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || ERROR

  if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === ENV_PRODUCTION) {
    let error = err
    if (error.name === CAST_ERROR) error = handelCastErrorDb(error)
    if (error.name === VALIDATION_ERROR) error = handelValidationErrorDb(error)
    if (error.code === DUPLICATE_FIELD_ERROR_CODE)
      error = handelDuplicateFieldsDB()
    sendErrorProd(error, res)
  }
}
