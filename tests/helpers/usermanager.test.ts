import { hashPassword, comparePassword } from '../../src/helpers/usermanager'; // Replace with the actual file path

describe('hashPassword', () => {
  it('should hash a password', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);

    // Check if the hashed password is not the same as the original password
    expect(hashedPassword).not.toBe(password);
  });

  it('should throw an error when given an empty password', async () => {
    const emptyPassword = '';
    await expect(hashPassword(emptyPassword)).rejects.toThrow('Error hashing password');
  });
});


describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
  
      // Check if the function correctly identifies matching passwords
      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  
    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword123';
      const anotherPassword = 'differentPassword456';
      const hashedPassword = await hashPassword(password);
  
      // Check if the function correctly identifies non-matching passwords
      const isMatch = await comparePassword(anotherPassword, hashedPassword);
      expect(isMatch).toBe(false);
    });
  
    it('should throw an error when given an empty input password', async () => {
      const emptyInputPassword = '';
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
  
      await expect(comparePassword(emptyInputPassword, hashedPassword)).rejects.toThrow('Error comparing passwords');
    });
  
    it('should throw an error when given an empty hashed password', async () => {
      const password = 'testPassword123';
      const emptyHashedPassword = '';
      
      await expect(comparePassword(password, emptyHashedPassword)).rejects.toThrow('Error comparing passwords');
    });
  });