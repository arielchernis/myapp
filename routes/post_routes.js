const express = require('express')
const Post = require("../controllers/post");
const router = express.Router()


router.get('/', Post.getAllPosts)

router.post('/', Post.createNewPost)

router.get('/:id', Post.getPostByid)

module.exports = router