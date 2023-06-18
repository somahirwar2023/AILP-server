const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const createFactory = require('./factories/createFactory')
const getFactory = require('./factories/getFactory')

exports.create = createFactory(Blog);
exports.getAll = getFactory(Blog)

exports.blogBasedOnTags = catchAsync(async (req, res, next)=>{
    const blogs = await Blog.find({tags: {$in: req.body.tags} || []})
    res.status(200).json({
        status: "success",
        data: blogs
    })
})
