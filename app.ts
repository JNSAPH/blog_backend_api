import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// Custom imports
import { createEnvFile, checkEnvFile } from './src/helpers/env';
import Logger from './src/helpers/logger';


dotenv.config();

const app = express();
const logger = new Logger();
// Middleware
app.use(express.json());
app.use(cors());            // middleware that enables Cross-Origin Resource Sharing (CORS) in Express.js.
app.use(helmet());          //  adds various security headers to enhance the security of your application.

// Check if the environment file exists, if not, create it
if (!checkEnvFile()) createEnvFile([
  { key: 'PORT', value: '5000' },
  { key: 'NODE_ENV', value: 'development' },
  { key: 'DB_HOST', value: 'localhost' },
])

// Routes
//app.use('/', serviceRoutes) 


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
