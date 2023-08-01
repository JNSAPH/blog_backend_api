import express from 'express';
import { PostController } from '../controllers/PostController';
import { query, header, body } from 'express-validator';
import { verifyToken } from '../helpers/jwt';

const router = express.Router();

// Express Validator
const validategetListOfPosts = [
  query('page').bail().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').bail().isInt({ min: 1 }).withMessage('PageSize must be an integer between 1 and 100'),
];

const postById = [
  query('id').bail().isString().notEmpty().withMessage('Id must be a string'),
];

const validatePutPost = [
  header('title').bail().isString().notEmpty().withMessage('Title must be a string'),
  //header('image').bail().isString().withMessage('Image must be a string'),
  body('content').bail().isString().notEmpty().withMessage('Content must be a string'),
];

const validateEditPost = [
  body('id').bail().isString().notEmpty().withMessage('id must be a string'),
  body('content').bail().isString().notEmpty().withMessage('Content must be a string'),
  body('title').bail().isString().notEmpty().withMessage('Title must be a string'),
  //body('image').bail().isString().withMessage('Image must be a string'),
];

const validateDeletePost = [
  body('id').bail().isString().notEmpty().withMessage('id must be a string'),
];

// Routes
router.get('/getListOfPosts', validategetListOfPosts, PostController.getListOfPosts);
router.get('/getPostById', postById, PostController.getPostById);
router.put('/putPost', validatePutPost, verifyToken, PostController.putPost);
router.post('/editPost', validateEditPost, verifyToken, PostController.editPost);
router.delete('/deletePost', validateDeletePost, verifyToken, PostController.deletePost);

export default router;
