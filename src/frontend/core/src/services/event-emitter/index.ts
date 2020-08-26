/*
 * Usage:
 *
 * import {EventEmitter} from '@the_platform/core';
 *
 * const EM = new EventEmitter();
 *
 * const callback = () => alert('foo');
 * EM.on('foo', callback);
 * EM.emit('foo'); // alert('foo');
 * EM.off('foo', callback);
 * EM.emit('foo'); // nothing.
 *
 * EM.once('bar', () => alert('bar'));
 * EM.emit('bar'); // alert('bar');
 * EM.emit('bar'); // nothing.
 *
 * EM.clear(); // clear all callbacks and events.
 *
 * EM.on('baz', () => alert('baz1'));
 * EM.on('baz', () => alert('baz2'));
 * EM.listenersNumber('baz'); // 2
 *
 * const EM = new EventEmitter(2);
 * EM.on('baz', () => alert('baz1'));
 * EM.on('baz', () => alert('baz2'));
 * EM.on('baz', () => alert('baz3')); // Throw Error: Max listeners has reached.
 */

interface ICallback {
  callback: () => void;
  context: unknown;
  weight: number;
}

export class EventEmitter {
  private readonly events: Set<string> = new Set();

  private readonly maxListeners: number;

  private callbacks: Record<string, ICallback[]> = {};

  constructor(maxListeners: number = 0) {
    this.maxListeners = maxListeners;
  }

  on(
    eventName: string,
    callback: () => void,
    context: unknown = null,
    weight: number = 1,
  ): this | Error | TypeError {
    // If event wasn't added before - just add it
    // and define callbacks as an empty object.
    if (!this.hasEvent(eventName)) {
      this.events.add(eventName);
      this.callbacks[eventName] = [];
    } else if (this.achieveMaxListener(eventName)) {
      // eslint-disable-next-line max-len
      return new Error(
        `Max listeners (${this.maxListeners}) for event "${eventName}" has reached.`,
      );
    } else if (this.callbackExists(eventName, callback, context)) {
      return new Error(
        `Event "${eventName}" already has the callback ${callback}.`,
      );
    }

    this.addCallback(eventName, callback, context, weight);

    return this;
  }

  once(
    eventName: string,
    callback: () => void,
    context: unknown = null,
    weight: number = 1,
  ): this | Error {
    const onceCallback = (...args: unknown[]): void => {
      this.off(eventName, onceCallback);
      callback.call(context, args);
    };

    return this.on(eventName, onceCallback, context, weight);
  }

  // off('foo') - remove all callback and event = 'foo'
  // off('foo', callback) - remove only this callback from event = 'foo'
  off(eventName: string, callback?: () => void): this {
    let callbackInd;

    if (this.hasEvent(eventName)) {
      if (!callback) {
        this.events.delete(eventName);
        delete this.callbacks[eventName];
      } else {
        callbackInd = this.getCallbackIndex(eventName, callback);

        if (callbackInd !== -1) {
          this.getCallbacks(eventName).splice(callbackInd, 1);
        }
      }
    }

    return this;
  }

  emit(eventName: string, ...args: unknown[]): this {
    const callbacksForEvent = this.callbacks[eventName];
    // Number of callbacks.
    let i = callbacksForEvent ? callbacksForEvent.length : 0;

    // eslint-disable-next-line no-plusplus
    while (i--) {
      const {callback, context} = callbacksForEvent[i];
      callback.call(context, args);
    }

    return this;
  }

  clear(): this {
    this.events.clear();
    this.callbacks = {};

    return this;
  }

  listenersNumber(eventName: string): number {
    return this.hasEvent(eventName) ? this.callbacks[eventName].length : 0;
  }

  private addCallback(
    eventName: string,
    callback: () => void,
    context: unknown,
    weight: number,
  ): void {
    this.getCallbacks(eventName).push({
      callback,
      context,
      weight,
    });

    this.getCallbacks(eventName).sort((a, b) => b.weight - a.weight);
  }

  private getCallbacks(eventName: string): ICallback[] {
    return this.callbacks[eventName];
  }

  private getCallbackIndex(eventName: string, callback: () => void): number {
    return this.hasEvent(eventName)
      ? this.getCallbacks(eventName).findIndex(
        (element) => element.callback === callback,
      )
      : -1;
  }

  private achieveMaxListener(eventName: string): boolean {
    return (
      this.maxListeners > 0
      && this.maxListeners <= this.listenersNumber(eventName)
    );
  }

  private callbackExists(
    eventName: string,
    callback: () => void,
    context: unknown,
  ): boolean {
    const callbackInd = this.getCallbackIndex(eventName, callback);
    const activeCallback = callbackInd !== -1 ? this.getCallbacks(eventName)[callbackInd] : null;

    return (
      callbackInd !== null
      && activeCallback
      && activeCallback.context === context
    );
  }

  private hasEvent(eventName: string): boolean {
    return this.events.has(eventName);
  }
}
