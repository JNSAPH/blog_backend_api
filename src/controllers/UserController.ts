import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResponse } from '../helpers/responseCreator';

import User from '../models/User';

import Logger from '../helpers/logger';
import { hashPassword } from '../helpers/usermanager';

const logger = new Logger();

export const UserController = {
    getUsers: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            // get all users from db and send the usernames back
            
    
        } catch (error) {
            
        }

        res.status(500).json(createResponse(500, 'Not implemented', false));

    },
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