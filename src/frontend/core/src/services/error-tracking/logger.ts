/*
 * Usage:
 *
 * import {loggerInit} from '@the_platform/core';
 * const logger = loggerInit({...});
 *
 * logger.info('foo');
 * logger.error(E_CODE.E_1, 'bar');
 * logger.error(E_CODE.E_1);
 *
 * OR
 *
 * ./bootstrap.ts
 * import {loggerInit} from '@the_platform/core';
 * loggerInit({...});
 *
 * ./bar.ts
 * import {logger} from '@the_platform/core';
 *
 * logger.info('any data');
 */

import {appErrors} from './errors';
import {proxyErrorHandler} from '../../utils/event/error-handler';

interface IOptions {
  hasServerTracking: boolean;
  trackAllErrorEvents: boolean;
  fingerprint?: string;
}

interface IErrorMeta {
  userAgent: string;
  fingerprint?: string;
  description?: string;
  trace?: string;
}

interface IErrorWithTimestamp extends Platform.IError {
  timestamp?: number;
  message?: string;
}

interface IErrorData {
  errors: IErrorWithTimestamp[];
  meta: IErrorMeta;
}

type TServerRequest = (errorData: IErrorWithTimestamp | IErrorData) => void;
type TReason = Record<'reason', string>;
type TLoggerInstance = ErrorTracking | ProxyHandler<Record<string, unknown>>;

const errorCollection: IErrorWithTimestamp[] = [];
// eslint-disable-next-line import/no-mutable-exports
export let logger: TLoggerInstance = proxyErrorHandler(
  'Logger',
) as TLoggerInstance;

export class ErrorTracking implements Platform.IErrorTracking {
  private readonly defaults: IOptions = {
    hasServerTracking: false,
    trackAllErrorEvents: true,
    fingerprint: '',
  };

  private readonly fetch: TServerRequest | undefined;

  private readonly options: IOptions;

  constructor(options?: IOptions, fetch?: TServerRequest) {
    this.fetch = fetch;
    this.options = {
      ...this.defaults,
      ...options,
    };

    // This event is sent to the global scope of a script when
    // a JavaScript Promise that has no rejection handler is rejected.
    if (this.options.trackAllErrorEvents) {
      window.addEventListener(
        'unhandledrejection',
        ({reason}: TReason): void => {
          this.collect({
            code: E_CODE.E_1,
            type: E_TYPE.UNKNOWN,
            title: 'Unhandled promise rejection',
            message: reason,
          });
        },
      );

      window.addEventListener(
        'error',
        ({type, message, lineno, filename}: ErrorEvent) => {
          this.collect({
            code: E_CODE.E_1,
            type: E_TYPE.UNKNOWN,
            title: 'Unhandled error',
            message: `${type} (${filename}, ${lineno}): ${message}\n`,
          });
        },
      );
    }

    window.addEventListener('beforeunload', this.handleBrowserExit);

    return this;
  }

  error(errorCode: E_CODE, message?: Platform.TMessage): void {
    this.out(
      errorCode,
      typeof message === 'object' ? [message] : message,
      'error',
    );
  }

  table(message: string): void {
    this.out(null, message, 'table');
  }

  info(message: string): void {
    this.out(null, message, 'log');
  }

  private out(
    errorCode: E_CODE | null,
    message?: Platform.TMessage,
    type: 'log' | 'table' | 'error' = 'log',
  ): void {
    const error = appErrors.find(
      ({code}: IErrorWithTimestamp) => code === errorCode,
    );

    this.collect({
      ...error,
      message: message.toString(),
    });

    if (typeof console !== 'undefined') {
      if (error) {
        // eslint-disable-next-line no-console
        console[type](error?.title, ...message);
      } else {
        // eslint-disable-next-line no-console
        console[type](message);
      }
    }
  }

  private readonly handleBrowserExit: () => void = (): void => {
    if (this.options.hasServerTracking) {
      this.sendToServer(errorCollection);
    }
  };

  private sendToServer(
    error: IErrorWithTimestamp | IErrorWithTimestamp[],
  ): void {
    const {fingerprint} = this.options;
    const {userAgent} = window.navigator;
    const errors = Array.isArray(error) ? error : [error];
    const errorData: IErrorData = {
      errors,
      meta: {
        fingerprint,
        userAgent,
      },
    };

    if (this.fetch) {
      this.fetch(errorData);
    }
  }

  private collect(error: IErrorWithTimestamp): void {
    error.timestamp = Date.now();

    if (error?.type === E_TYPE.CRITICAL) {
      // Immediately send error to the server.
      this.sendToServer(error);
    } else {
      // Collect errors, will be pushed to server later.
      errorCollection.push(error);
    }
  }
}

export const loggerInit = (
  config?: IOptions,
  fetch?: TServerRequest,
): ErrorTracking => {
  logger = new ErrorTracking(config, fetch);
  return logger;
};
