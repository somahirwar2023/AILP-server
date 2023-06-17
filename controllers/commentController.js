const Comment = require('../models/commentsModel')
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(Comment);
exports.getAll = getFactory(Comment)
