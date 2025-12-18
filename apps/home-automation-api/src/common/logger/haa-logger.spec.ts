import { ConsoleLogger } from '@nestjs/common';

import { HaaLogger } from './haa-logger';

type TestClass = {
  calculateSomething: () => 1;
};

describe('SpaLogger', () => {
  let logger: HaaLogger<TestClass>;
  let debugSpy: jest.SpyInstance;
  let verboseSpy: jest.SpyInstance;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new HaaLogger<TestClass>('test');
    debugSpy = jest
      .spyOn(ConsoleLogger.prototype, 'debug')
      .mockImplementation(() => {});
    verboseSpy = jest
      .spyOn(ConsoleLogger.prototype, 'verbose')
      .mockImplementation(() => {});
    logSpy = jest
      .spyOn(ConsoleLogger.prototype, 'log')
      .mockImplementation(() => {});
    warnSpy = jest
      .spyOn(ConsoleLogger.prototype, 'warn')
      .mockImplementation(() => {});
    errorSpy = jest
      .spyOn(ConsoleLogger.prototype, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(logger).toBeTruthy();
  });

  describe('debug', () => {
    it.each([
      ['calculateSomething', 'calculateSomething - \x1B[95mdebug test\x1B[39m'],
      ['', '\x1B[95mdebug test\x1B[39m'],
      [undefined, '\x1B[95mdebug test\x1B[39m'],
    ])('should call debug', (context, expectedValue) => {
      logger.debug('debug test', context);
      expect(debugSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return string when message is object', () => {
      const message = [{}];
      logger.debug(message);
      expect(debugSpy).toHaveBeenCalledWith(
        expect.stringMatching(JSON.stringify(message)),
      );
    });
  });

  describe('verbose', () => {
    it.each([
      [
        'calculateSomething',
        'calculateSomething - \x1B[96mverbose test\x1B[39m',
      ],
      ['', '\x1B[96mverbose test\x1B[39m'],
      [undefined, '\x1B[96mverbose test\x1B[39m'],
    ])('should call verbose', (context, expectedValue) => {
      logger.verbose('verbose test', context);
      expect(verboseSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return string when message is object', () => {
      const message = [{}];
      logger.verbose(message);
      expect(verboseSpy).toHaveBeenCalledWith(
        expect.stringMatching(JSON.stringify(message)),
      );
    });
  });

  describe('log', () => {
    it.each([
      ['calculateSomething', 'calculateSomething - \x1B[32mlog test\x1B[39m'],
      ['', '\x1B[32mlog test\x1B[39m'],
      [undefined, '\x1B[32mlog test\x1B[39m'],
    ])('should call log', (context, expectedValue) => {
      logger.log('log test', context);
      expect(logSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return string when message is object', () => {
      const message = [{}];
      logger.log(message);
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringMatching(JSON.stringify(message)),
      );
    });
  });

  describe('warn', () => {
    it.each([
      ['calculateSomething', 'calculateSomething - \x1B[33mwarn test\x1B[39m'],
      ['', '\x1B[33mwarn test\x1B[39m'],
      [undefined, '\x1B[33mwarn test\x1B[39m'],
    ])('should call warn', (context, expectedValue) => {
      logger.warn('warn test', context);
      expect(warnSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return string when message is object', () => {
      const message = [{}];
      logger.warn(message);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringMatching(JSON.stringify(message)),
      );
    });
  });

  describe('error', () => {
    it.each([
      ['calculateSomething', 'calculateSomething - \x1B[31merror test\x1B[39m'],
      ['', '\x1B[31merror test\x1B[39m'],
      [undefined, '\x1B[31merror test\x1B[39m'],
    ])('should call error', (context, expectedValue) => {
      logger.error('error test', context);
      expect(errorSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should return string when message is object', () => {
      const message = [{}];
      logger.error(message);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringMatching(JSON.stringify(message)),
      );
    });
  });
});
