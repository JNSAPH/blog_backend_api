import chalk from 'chalk';

/**
 * @description This class is used to log messages to the console
 * @async false
 * @class Logger
 * @example
 * import Logger from './logger';
 *  
 *  const logger = new Logger();
 *  logger.debug("Debug message");
 *  logger.info("Info message");
 *  logger.warning("Warning message");
 *  logger.error("Error message");
 *  logger.success("Success message");
 * 
 */
export default class Logger {
    private showDebugLogs: boolean;
  
    constructor(showDebugLogs: boolean = true) {
      this.showDebugLogs = showDebugLogs;
    }

    /**
     * @param messages 
     * @description This method will only log messages if the showDebugLogs property is set to true
     * @color blue
     */
    public debug(...messages: any[]): void {
      if (this.showDebugLogs) {
        const message = messages.join(' ');
        console.log(chalk.blue("DEBUG") + "   | " + message);
      }
    }

    /**
     * @param messages 
     * @description This method will log messages with the INFO tag
     * @color blueBright
     */
    public info(...messages: any[]): void {
      const message = messages.join(' ');
      console.info(chalk.blueBright("INFO") + "    | " + message);
    }

    /**
     * @param messages
     * @description This method will log messages with the WARNING tag
     * @color yellow  
     */
    public warning(...messages: any[]): void {
      const message = messages.join(' ');
      console.warn(chalk.yellow("WARNING") + " | " + message);
    }
  
    /**
     * 
     * @param messages 
     * @description This method will log messages with the ERROR tag
     * @color red
     */
    public error(...messages: any[]): void {
      const lastArg = messages[messages.length - 1];
      const hasError = lastArg instanceof Error;
  
      let message = messages.slice(0, hasError ? -1 : messages.length).join(' ');
  
      if (hasError) {
        const error = lastArg as Error;
        message += ` | Error: ${error.name} - ${error.message}`;
      }
  
      console.error(chalk.red("ERROR") + "   | " + message);
    }
  
    /**
     * 
     * @param messages
     * @description This method will log messages with the SUCCESS tag
     * @color green
     */
    public success(...messages: any[]): void {
      const message = messages.join(' ');
      console.log(chalk.green("SUCCESS") + " | " + message);
    }

    /**
     * @deprecated
     * @description This method is used to test the logger
     */
    public testLogger(): void {
        this.debug("Debug message");
        this.info("Info message");
        this.warning("Warning message");
        this.error("Error message");
        this.success("Success message");
    }
}