import Logger from "../../src/helpers/logger";

describe('Logger', () => {
    it('should log messages with the INFO tag', () => {
      const logger = new Logger(false); // Set showDebugLogs to false
      const spy = jest.spyOn(console, 'info');
      
      logger.info('Test Info Message');
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('INFO'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test Info Message'));
      
      spy.mockRestore();
    });
  
    it('should log messages with the WARNING tag', () => {
      const logger = new Logger();
      const spy = jest.spyOn(console, 'warn');
      
      logger.warning('Test Warning Message');
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('WARNING'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test Warning Message'));
      
      spy.mockRestore();
    });
  
    it('should log messages with the ERROR tag', () => {
      const logger = new Logger();
      const spy = jest.spyOn(console, 'error');
      
      logger.error('Test Error Message');
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('ERROR'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test Error Message'));
      
      spy.mockRestore();
    });
  
    it('should log messages with the SUCCESS tag', () => {
      const logger = new Logger();
      const spy = jest.spyOn(console, 'log');
      
      logger.success('Test Success Message');
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('SUCCESS'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test Success Message'));
      
      spy.mockRestore();
    });
  
    it('should not log messages with the DEBUG tag if showDebugLogs is false', () => {
      const logger = new Logger(false);
      const spy = jest.spyOn(console, 'log');
      
      logger.debug('Test Debug Message');
      
      expect(spy).not.toHaveBeenCalled();
      
      spy.mockRestore();
    });
  
    it('should log messages with the DEBUG tag if showDebugLogs is true', () => {
      const logger = new Logger(true);
      const spy = jest.spyOn(console, 'log');
      
      logger.debug('Test Debug Message');
      
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('DEBUG'));
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Test Debug Message'));
      
      spy.mockRestore();
    });
  });