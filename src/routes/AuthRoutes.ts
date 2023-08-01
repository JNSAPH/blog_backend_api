import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { query, header, body } from 'express-validator';

const router = express.Router();

// Express Validator
const validategetLogin = [
  body('username').bail().notEmpty().isString().withMessage('Username must be a string'),
  body('password').bail().notEmpty().isString().withMessage('Password must be a string'),
];


// Routes

router.post('/login', validategetLogin, AuthController.login);

export default router;
