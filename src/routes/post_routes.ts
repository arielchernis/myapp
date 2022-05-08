import express from "express";
import authenticate from "../common/auth_middleware";
import Post from '../controllers/post';

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Authentication API
 */


router.get('/', Post.getAllPosts)

router.post('/', authenticate, Post.createNewPost)

router.get('/:id', Post.getPostById)

router.delete('/:id', authenticate, Post.DeletePostById)

export = router