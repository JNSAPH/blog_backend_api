import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// Custom imports
import { createEnvFile, checkEnvFile } from './src/helpers/env';
import { connectToDatabase } from './src/services/dbConnect';
import Logger from './src/helpers/logger';

// Routes
import PostRoutes from './src/routes/PostRoutes';
import AuthRoutes from './src/routes/AuthRoutes';
import UserRoutes from './src/routes/UserRoutes';
import UIRoutes from './src/routes/UIRoutes';

// Creating Instances and Setting up stuff
const app = express();
const logger = new Logger();

dotenv.config();

// Middleware
app.use(express.json());                          // middleware that parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));  // middleware that parses incoming requests with urlencoded payloads
app.use(cors());                                  // middleware that enables Cross-Origin Resource Sharing (CORS) in Express.js.
app.use(helmet());                                // adds various security headers to enhance the security of your application.

// Check if the environment file exists, if not, create it
if (!checkEnvFile()) createEnvFile([
  { key: 'PORT', value: '3000' },
  { key: "node_env", value: "development" },
  { key: 'MONGODB_URI', value: '' },
  { key: "JWT_SECRET", value: 'secret' }, // this is horrible, i know.
  { key: "SALT", value: 'secret'}
])

// Connect to the database
connectToDatabase()
.then(() => logger.info('Connected to MongoDB.'))
.catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
});

// Routes
app.use('/post', PostRoutes); // Retrival Route for Blog Posts
app.use('/auth', AuthRoutes); // Admin Routes
app.use('/userMgmt', UserRoutes); // User Management Routes
app.use('/admin', UIRoutes); // User Management Routes


// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
