const InterviewExperience = require('../models/interviewExperienceModel')
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(InterviewExperience);
exports.getAll = getFactory(InterviewExperience)
