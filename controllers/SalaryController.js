const Salary = require('../models/SalaryModel')
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(Salary)
exports.getAll = getFactory(Salary)
