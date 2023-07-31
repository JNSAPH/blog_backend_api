import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

export const hashPassword = async (password: string): Promise<string> => {
  try {
    if (password === '') {
      throw new Error('Password cannot be empty');
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * 
 * @param inputPassword 
 * @param hashedPassword 
 * @returns True if the passwords match, false if not
 */
export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    if (inputPassword === '') {
      throw new Error('Input password cannot be empty');
    } else if (hashedPassword === '') {
      throw new Error('Hashed password cannot be empty');
    }

    // Compare the input password with the hashed password
    const match = await bcrypt.compare(inputPassword, hashedPassword);

    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
