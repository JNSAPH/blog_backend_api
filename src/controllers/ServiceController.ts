import express from 'express';

const router = express.Router();

export const Servicecontroller = {
    getServices: async (req, res) => {
        try {
            
            return res.json({ 
                service: 'image-service', 
                status: 'running',
                routes: [
                    {
                        method: 'GET',
                        path: '/',
                        description: 'Get all available routes and service information',
                    },
                    {
                        method: 'POST',
                        path: '/images/upload',
                        description: 'Upload an Image',
                    },
                    {
                        method: 'GET',
                        path: '/images/getImageIds',
                        description: 'Get all IDs of all images for the user',
                    },
                    {
                        method: 'GET',
                        path: '/images/getImageById',
                        description: 'Get an image by ID',
                    }
                ]
             });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};