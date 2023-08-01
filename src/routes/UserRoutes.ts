import express from 'express';
import { UserController } from '../controllers/UserController';
import { header, body } from 'express-validator';
import { verifyToken } from '../helpers/jwt';

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
router.get('/getUsers', validategetGetUsers, verifyToken, UserController.getUsers);
router.post('/createUser', validateCreateUser, verifyToken, UserController.createUser);
router.delete('/deleteUser', validateDeleteUser, verifyToken, UserController.deleteUser);

export default router;
