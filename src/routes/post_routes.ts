import express from "express";
import authenticate from "../common/auth_middleware";
import {getAllPosts, getPostById, deletePostById, createNewPost} from '../controllers/post'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Authentication API
 */


router.get('/', getAllPosts)

router.post('/', authenticate, createNewPost)

router.get('/:id', getPostById)

router.delete('/:id', authenticate, deletePostById)

export = router