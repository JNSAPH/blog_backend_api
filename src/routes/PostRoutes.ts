import express from 'express';
import { PostController } from '../controllers/PostController';
import { query, header, body } from 'express-validator';

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

// Routes
router.get('/getListOfPosts', validategetListOfPosts, PostController.getListOfPosts);
router.get('/getPostById', postById, PostController.getPostById);
router.put('/putPost', validatePutPost, PostController.putPost);

export default router;
