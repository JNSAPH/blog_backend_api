// controllers/PostController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import PostSchema from '../models/Post';
import Logger from '../helpers/logger';
import { createResponse } from '../helpers/responseCreator';


const logger = new Logger();

export const PostController = {
  /**
   * @api {get} /posts/getListOfPosts?page=<NUMBER>&pageSize=<NUMBER> Get list of posts
   * @apiName GetPosts
   * @apiGroup Posts
   * @apiVersion  1.0.0
   * @apiParam  {Number} page Page number
   * @apiParam  {Number} pageSize Page size
   * @apiSuccess (200) {Object} posts List of posts
   * @apiSuccessExample {json} Success-Response:
   * {
   *	"statusCode": 200,
   *	"error": false,
   *	"body": {
   *		"page": 1,
   *		"pageSize": 1,
   *		"totalPosts": 17,
   *		"posts": [
   *			{
   *				"_id": "64c828abacdd4431d1c0a710",
   *				"title": "latest",
   *				"image": "https://source.unsplash.com/random",
   *				"author": "Admin",
   *				"id": "994dc657-bf0a-4a0c-932e-f9ee1e3ea92d",
   *				"date": "2023-07-31T21:33:31.485Z"
   *			}
   *		]
   *	}
   *}
    * @apiError (400) {json} Missing parameters
    * @apiError (500) {json} Internal server error
   */
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
      const posts = await PostSchema.find().skip(offset).limit(limit).sort({ date: -1 }).select('id title image date author');;

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

  /**
   * 
   * @api {get} /posts/getPostById?id=<UUID> Get post by id
   * @apiName GetPostById
   * @apiGroup Posts
   * @apiVersion  1.0.0
   * @apiParam  {String} id Post id
   * @apiSuccess (200) {Object} post Post
   * @apiSuccessExample {json} Success-Response:
   * {
  "statusCode": 200,
  "error": false,
  "body": [
    {
      "_id": "64c7f8faf4e350100206d84e",
      "title": "latest",
      "image": "https://source.unsplash.com/random",
      "content": "Hello World Change",
      "author": "Admin",
      "id": "e9b3d1d0-6a31-45c3-8c24-0b27315ab7d1",
      "date": "2023-07-31T18:10:02.271Z",
      "__v": 0
    }
  ]
}
    * @apiError (400) {json} Missing parameters
    * @apiError (500) {json} Internal server error
   */
  getPostById: async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the id property from the query string
    const id = req.query.id as string;

    try {
      // Fetch the post from the database
      const post = await PostSchema.find({ id })

      // Throw an error if the post doesn't exist
      if (!post[0]) throw new Error('Post not found');

      // Return the post
      res.json(createResponse(200, post));
    } catch (err) {
      logger.error('Error while fetching post:', err);
      res.status(500).json(createResponse(500, err.message, true));
    }
  },

  /**
   * 
   * @api {put} /posts/putPost Create post
   * @apiName PutPost
   * @apiGroup Posts
   * @apiVersion  1.0.0
   * @apiHeader  {String} title Post title
   * @apiBody  {String} content Post content
   * @apiSuccess (200) {Object} post Post
   * @apiSuccessExample {json} Success-Response:
   * {
  "statusCode": 200,
  "error": false,
  "body": {
    "title": "latest",
    "image": "https://source.unsplash.com/random",
    "content": "Hello",
    "author": "Admin",
    "_id": "64c828abacdd4431d1c0a710",
    "id": "994dc657-bf0a-4a0c-932e-f9ee1e3ea92d",
    "date": "2023-07-31T21:33:31.485Z",
    "__v": 0
  }
}
    * @apiError (400) {json} Missing parameters
    * @apiError (500) {json} Internal server error
   */
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
  },

  /**
   * @api {post} /posts/editPost Edit post
   * @apiName EditPost
   * @apiGroup Posts
   * @apiVersion  1.0.0
   * @apiHeader  {String} title Post title
   * @apiBody  {String} content Post content
   * @apiSuccess (200) {Object} post Post
   * @apiSuccessExample {json} Success-Response:
   * {
        "statusCode": 200,
        "error": false,
        "body": "Post edited successfully."
      }
    * @apiError (500) {json} Internal server error
    * @apiError (400) {json} Missing parameters
    * @apiError (404) {json} Post not found
   */
  editPost: async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract the title and content from the request body
      const { id } = req.body;
      const { content } = req.body;
      const { title } = req.headers;
      //const { image } = req.body;

      // Create a new post in mongodb
      const post = await PostSchema.findOneAndUpdate({ id }, {
        title,
        content,
        //image,
      });

      if (!post) throw new Error('Post not found');

      // Save the post
      await post.save();

      // Return success response
      res.status(200).json(createResponse(200, "Post edited successfully."));
      logger.debug("Post edited successfully.");

    } catch (error) {
      logger.error("Error editing Post:", error.message);
      res.status(404).json(createResponse(404, error.message, true));
    }
  },

  /**
   * @api {delete} /posts/deletePost Delete post
   * @apiName DeletePost
   * @apiGroup Posts
   * @apiVersion  1.0.0
   * @apiHeader  {String} id Post id
   * @apiSuccess (200) {Object} post Post
   * @apiSuccessExample {json} Success-Response:
   * {
	"statusCode": 200,
	"error": false,
	"body": "Post deleted successfully."
}
    * @apiError (400) {json} Missing parameters
    * @apiError (500) {json} Internal server error
    * @apiError (500) {json} Post not found
   */
  deletePost: async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the id property from the query string
    const { id } = req.body;

    try {
      // Fetch the post from the database
      const post = await PostSchema.findOneAndDelete({ id })

      // Throw an error if the post doesn't exist
      if (!post) throw new Error('Post not found');

      // Return the post
      res.json(createResponse(200, "Post deleted successfully."));
    } catch (err) {
      logger.error('Error while deleting post:', err);
      res.status(500).json(createResponse(500, err.message, true));
    }
  },

};
