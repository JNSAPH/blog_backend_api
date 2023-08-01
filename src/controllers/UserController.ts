import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResponse } from '../helpers/responseCreator';

import User from '../models/User';

import Logger from '../helpers/logger';
import { hashPassword } from '../helpers/usermanager';

const logger = new Logger();

export const UserController = {
    /**
     * @api {get} /users/getUsers Get list of users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @apiSuccess (200) {Object} users List of users
     * @apiSuccessExample {json} Success-Response:
     * {
	"statusCode": 200,
	"error": false,
	"body": [
		"Test2",
		"Test8"
	]
}
        * @apiError (400) {json} Missing parameters
        * @apiError (500) {json} Internal server error
     */
    getUsers: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            // get all users from db and send the usernames back
            const Users = await User.find();
            
            const usernames = Users.map((user) => user.username);

            res.status(200).json(createResponse(200, usernames, false));
        } catch (error) {
            res.status(500).json(createResponse(500, error.message, true));
        }

    },
    /**
     * @api {post} /users/createUser Create user
     * @apiName CreateUser
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @apiBody {String} username Username
     * @apiBody {String} password Password
     * @apiSuccess (200) {String} token JWT Token
     * @apiSuccessExample {json} Success-Response:
     * {
	"statusCode": 200,
	"error": false,
	"body": "User created"
}
        * @apiError (400) {json} Missing parameters
        * @apiError (500) {json} Internal server error
     */
    createUser: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, password } = req.body;
            // Create new user
            const user = new User({
                username,
                password: await hashPassword(password),
            });

            // Save user
            await user.save();

            res.status(200).json(createResponse(200, 'User created', false));
        } catch (error) {
            logger.error(error);
            return res.status(500).json(createResponse(500, error.message, true));
        }
    },

    /**
     * @api {delete} /users/deleteUser Delete user
     * @apiName DeleteUser
     * @apiGroup Users
     * @apiVersion  1.0.0
     * @apiBody {String} username Username
     * @apiSuccess (200) {String} token JWT Token
     * @apiSuccessExample {json} Success-Response:
     * {
	"statusCode": 200,
	"error": false,
	"body": "User deleted"
}
        * @apiError (400) {json} Missing parameters
        * @apiError (500) {json} Internal server error
        * @apiError (500) {json} User not found
     */
    deleteUser: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const deletedUser = await User.findOneAndDelete({ username: req.body.username });
            if (!deletedUser) throw new Error('User not found');

            res.status(200).json(createResponse(200, 'User deleted', false));
        } catch (error) {
            res.status(500).json(createResponse(500, error.message, true));
        }
    },

};