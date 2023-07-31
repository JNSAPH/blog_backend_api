import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createResponse } from './responseCreator';

dotenv.config();

export const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 360000
    });
}

export const verifyToken = (req: Request, res: Response, next) => {
    try {
        // Get token from header
        const { authorization } = req.headers;

        // Split the token from the Bearer
        const token = authorization.split(' ')[1];
        
        if (!jwt.verify(token, process.env.JWT_SECRET)) throw new Error('invalid signature');
    } catch (error) {
        res.status(401).json(createResponse(401, error.message, true));
    }

    next();
}