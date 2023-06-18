const express = require('express')
const blogController = require('../controllers/blogController')
const Auth = require('../middlewares/auth')
const Blog = require('../models/blogModel')

const router = express.Router()

router.route('/').post(blogController.create).get(blogController.getAll)
router.route('/tags').post(blogController.blogBasedOnTags)

// router.get('/:id', Auth, async (req, res) => {
//     const blogId = req.params.id;
//     try{
//         const blog = await Blog.findById(blogId);
//         blog.views++;
//         blog.trendRating--;
//         await blog.save();
//     } catch(error){
//         res.status(500).send(error)
//     }
// })

router.post('/upvote/:id', Auth, async (req, res) => {
    const blogId = req.params.id;
    try{
        const blog = await Blog.findById(blogId)
        blog.votes++;
        blog.trendRating = blog.votes*2 + blog.views;
        await blog.save();
        res.send()
    } catch(error){
        res.status(500).send(error)
    }
})

router.post('/downvote/:id', Auth, async (req, res) => {
    const blogId = req.params.id;
    try{
        const blog = await Blog.findById(blogId)
        blog.votes--;
        blog.trendRating = blog.votes*2 + blog.views;
        await blog.save();
        res.send()
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/trending-blogs', Auth, async (req, res) => {
    try{
        const sortedBlogs = await Blog.find().sort({ "trendRating": -1 }).limit(5)
        res.send(sortedBlogs)
    } catch(error){
        res.status(500).send(error);
    }
})

module.exports = router
