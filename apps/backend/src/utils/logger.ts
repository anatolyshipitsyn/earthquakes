/* eslint-disable no-console */
type LogLevel = 'log' | 'info' | 'warn' | 'error';

export class Logger {
  private static logMessage(
    level: LogLevel,
    message: string,
    ...optionalParams: unknown[]
  ): void {
    console[level](message, ...optionalParams);
  }

  static log(message: string, ...optionalParams: unknown[]): void {
    this.logMessage('log', message, ...optionalParams);
  }

  static info(message: string, ...optionalParams: unknown[]): void {
    this.logMessage('info', message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: unknown[]): void {
    this.logMessage('warn', message, ...optionalParams);
  }

  static error(message: string, ...optionalParams: unknown[]): void {
    this.logMessage('error', message, ...optionalParams);
  }
}
