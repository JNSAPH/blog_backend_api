import express from 'express';
import { UserController } from '../controllers/UserController';
import { query, header, body } from 'express-validator';

const router = express.Router();

// Express Validator
const validategetGetUsers = [
];

const validateCreateUser = [
    body('username').bail().notEmpty().isString().withMessage('Username must be a string'),
    body('password').bail().notEmpty().isString().withMessage('Password must be a string'),
];

const validateDeleteUser = [
    body('username').bail().notEmpty().isString().withMessage('Username must be a string'),
];


// Routes
router.get('/getUsers', validategetGetUsers, UserController.getUsers);
router.get('/createUser', validateCreateUser, UserController.createUser);
router.get('/deleteUser', validateDeleteUser, UserController.deleteUser);

export default router;
