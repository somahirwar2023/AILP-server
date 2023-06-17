const catchAsync = require('../../utils/catchAsync')

module.exports = Model => catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body)

    res.status(201).json({
        status: 'success',
        data
    })
})
