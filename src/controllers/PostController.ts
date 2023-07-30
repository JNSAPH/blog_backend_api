// controllers/PostController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

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

    // dummy data
    const dummyPosts = Array.from({ length: pageSize }, (_, index) => ({
      id: index + offset + 1,
      title: `Post ${index + offset + 1}`,
      content: `This is the content of Post ${index + offset + 1}`,
    }));

    // Return paginated response
    res.json({
      page,
      pageSize,
      totalPosts: 100, // Replace with the actual total number of posts
      posts: dummyPosts,
    });
  },
};
