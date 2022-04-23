const Post = require('../models/postmodel')


const getAllPosts = async (req, res) => {
    console.log('getAllPosts')
    try {
        const sender = req.query.sender
        var posts
        if (sender != null | sender != undefined) {
            posts = await Post.find({'sender': sender})
        } else {
            posts = await Post.find()
        }
        res.status(200).send(posts)
    } catch (err) {
        res.status(400).send({

            'err': err.message
        })
    }
}

const createNewPost = async (req, res) => {
    const post = Post({
        message: req.body.message,
        sender: req.body.sender
    })
    try {
        newPost = await post.save()
        res.status(200).send(newPost)
    } catch (err) {
        res.status(400).send({
            'err': err.message
        })
    }

}
const getPostByid = async (req, res) => {
    console.log('getPostByid with id:' + req.params.id)
    const id = req.params.id
    if (id == null | id === undefined) {
        return res.status(400).send({
            'err': 'no id provided'
        })
    }
    try {
        const post = await Post.findById(id)
        if (post == null) {
            res.status(400).send({
                err: "post doesnt exist",
            })
        } else {
            res.status(200).send(post)
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        })
    }


}
module.exports = {getAllPosts, createNewPost, getPostByid}
