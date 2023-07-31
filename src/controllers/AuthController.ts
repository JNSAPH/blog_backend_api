import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResponse } from '../helpers/responseCreator';
import { generateToken, verifyToken } from '../helpers/jwt';

import User from '../models/User';

import Logger from '../helpers/logger';

const logger = new Logger();

export const AuthController = {
    login: async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            // Extract the username and password from the request body
            const { username, password } = req.body;

            // Check for User in DB
            const user = User.findOne({ username: req.body.username });

            // Throw an error if the user doesn't exist
            if (!user[0]) throw new Error(`User ${username} not found`);

            const token = await generateToken(user);

            res.status(200).json(createResponse(200, token));
        } catch (error) {
            logger.error(error);
            return res.status(400).json(createResponse(400, error.message));
        }
    }
};