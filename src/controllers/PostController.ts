// controllers/PostController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import PostSchema from '../models/Post';
import Logger from '../helpers/logger';
import { createResponse } from '../helpers/responseCreator';


const logger = new Logger();

export const PostController = {
  getListOfPosts: async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the page and pageSize properties from the query string
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);

    // Calculate the offset and limit for fetching posts
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    try {
      // Fetch actual posts from the database
      const totalPosts = await PostSchema.countDocuments(); // Get the total number of posts in the database
      const posts = await PostSchema.find().skip(offset).limit(limit).sort({ date: -1 });

      // Return paginated response
      res.json(createResponse(200, {
        page,
        pageSize,
        totalPosts,
        posts,
      }));
    } catch (err) {
      logger.error('Error while fetching posts:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  putPost: async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract the title and content from the request body
      const { content } = req.body;
      const { title } = req.headers;
      //const { image } = req.body;

      // Create a new post in mongodb
      const postSchema = new PostSchema({
        title,
        content,
        //image,
      });

      // Save the post
      await postSchema.save();

      // Return success response
      res.status(200).json(createResponse(200, postSchema));
      logger.debug("Post created successfully.");

    } catch (error) {
      logger.error("Error creating Post:", error.message);
      res.status(500).json(createResponse(500, error.message, true));
    }
  }
};
