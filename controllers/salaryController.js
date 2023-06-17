const Salary = require('../models/salaryModel')
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(Salary)
exports.getAll = getFactory(Salary)
