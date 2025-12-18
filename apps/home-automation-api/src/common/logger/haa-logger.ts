import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class HaaLogger<ServiceType> extends ConsoleLogger {
  log<ContextType = ServiceType>(
    message: unknown,
    context?: keyof ContextType,
  ): void {
    super.log(
      this.createLogMessage(context as string, message as string, 'log'),
    );
  }

  verbose<ContextType = ServiceType>(
    message: unknown,
    context?: keyof ContextType,
  ): void {
    super.verbose(
      this.createLogMessage(context as string, message as string, 'verbose'),
    );
  }

  debug<ContextType = ServiceType>(
    message: unknown,
    context?: keyof ContextType,
  ): void {
    super.debug(
      this.createLogMessage(context as string, message as string, 'debug'),
    );
  }

  warn<ContextType = ServiceType>(
    message: unknown,
    context?: keyof ContextType,
  ): void {
    super.warn(
      this.createLogMessage(context as string, message as string, 'warn'),
    );
  }

  error<ContextType = ServiceType>(
    message: unknown,
    context?: keyof ContextType,
  ): void {
    super.error(
      this.createLogMessage(context as string, message as string, 'error'),
    );
  }

  private createLogMessage(
    context: string,
    message: string,
    level: LogLevel,
  ): string {
    const prefix = this.createPrefix(context, message);
    return `${prefix}${super.stringifyMessage(message, level)}`;
  }

  private createPrefix(context: string, message: string): string {
    let prefix = '';
    if (context) {
      prefix = message ? context + ' - ' : context;
    }
    return prefix;
  }
}
