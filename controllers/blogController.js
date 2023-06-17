const Blog = require('../models/blogModel')
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(Blog);
exports.getAll = getFactory(Blog)
