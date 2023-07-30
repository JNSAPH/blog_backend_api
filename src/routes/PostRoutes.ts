import express from 'express';
import { PostController } from '../controllers/PostController';
import { query } from 'express-validator';

const router = express.Router();

// Express Validator
const validatePagination = [
  query('page').bail().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').bail().isInt({ min: 1 }).withMessage('PageSize must be an integer between 1 and 100'),
];

// Routes
router.get('/', validatePagination, PostController.getListOfPosts);

export default router;
