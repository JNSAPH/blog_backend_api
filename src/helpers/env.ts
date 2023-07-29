// export a function that creates a .env file with the following content:
import fs from 'fs';
import Logger from './logger';

// Create a logger instance
const logger = new Logger();

interface KeyValue {
    [key: string]: string;
}

export const createEnvFile = (data: KeyValue[]): void => {
    const envFilePath = '.env';

    // Prepare the content for the environment file
    const envContent = data.map(pair => `${pair.key}=${pair.value}`).join('\n');

    // Write the content to the environment file
    fs.writeFile(envFilePath, envContent, err => {
        if (err) {
            logger.error('Error writing the environment file:', err);
            process.exit(1);
        } else {
            logger.success('Environment file created successfully');
        }
    });
}

export const checkEnvFile = (): Boolean => {
    const envFilePath = '.env';
    const envExampleFilePath = '.env.example';

    // Check if the environment file exists
    if (!fs.existsSync(envFilePath)) {
        logger.warning(`The environment file ${envFilePath} does not exist`);
        return false;
    } else {
        logger.info(`The environment file ${envFilePath} exists`);
        return true;
    }
}