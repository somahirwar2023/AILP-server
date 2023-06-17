const catchAsync = require('../../utils/catchAsync')

module.exports = Model => catchAsync(async (req, res, next) => {
    const data = await Model.find({})

    res.status(201).json({
        status: 'success',
        data
    })
})
