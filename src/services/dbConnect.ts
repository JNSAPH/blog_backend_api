import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Logger from '../helpers/logger';

const logger = new Logger();

dotenv.config();

const { MONGODB_URI } = process.env;


export const connectToDatabase = async (): Promise<void> => {
  if (!MONGODB_URI) {
    logger.error('No MongoDB URI provided.');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    // Handle different types of errors, if needed
    if (error instanceof Error) {
      logger.error('Error connecting to MongoDB:', error.message);
    } else {
      logger.error('Unknown error occurred while connecting to MongoDB.');
    }

    throw error; // Propagate the error to the calling code
  }
};