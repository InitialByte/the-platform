import {EventEmitter} from '../index';

describe('EventEmitter', () => {
  it('1.1: should create an instance of EventEmitter with no parameters.', () => {
    const EM = new EventEmitter();
    expect(EM instanceof EventEmitter).toBe(true);
  });

  it('1.2: should subscribe on an event and emit it.', () => {
    const EM = new EventEmitter();
    let foo = 'foo';

    EM.on('baz', () => {
      foo = 'baz';
    });
    EM.emit('baz');
    expect(foo).toBe('baz');
  });

  it('1.3: should not emit an event after "off" all callback for the event.', () => {
    const EM = new EventEmitter();
    let foo = 'foo';
    const callback = (): void => {
      foo = 'baz';
    };

    EM.on('baz', callback);
    EM.off('baz');
    EM.emit('baz');
    expect(foo).toBe('foo');
  });

  // eslint-disable-next-line max-len
  it('1.4: should not emit an event after "off" a callback for the event and keep other callbacks.', () => {
    const EM = new EventEmitter();
    let foo = 'foo';
    const callback = (): void => {
      foo = 'baz';
    };

    EM.on('baz', callback);
    EM.on('bar', () => {
      foo = 'bar';
    });
    EM.off('baz', callback);
    EM.emit('baz');
    expect(foo).toBe('foo');
    EM.emit('bar');
    expect(foo).toBe('bar');
  });

  it('1.5: should emit an event only once.', () => {
    const EM = new EventEmitter();
    let foo = 'foo';
    const callback = (): void => {
      foo = 'baz';
    };

    EM.once('baz', callback);
    EM.emit('baz');
    expect(foo).toBe('baz');
    foo = 'foo';
    EM.emit('baz');
    expect(foo).toBe('foo');
  });

  it('1.6: clear all events and callbacks.', () => {
    const EM = new EventEmitter();
    let foo = 'foo';
    const callback = (): void => {
      foo = 'baz';
    };

    EM.on('baz', callback);
    EM.clear();
    EM.emit('baz');
    expect(foo).toBe('foo');
  });

  it('1.7: allow only 3 listeners for an event.', () => {
    const numberOfListeners = 3;
    const EM = new EventEmitter(numberOfListeners);

    EM.on('baz', jest.fn());
    EM.on('baz', jest.fn());
    EM.on('baz', jest.fn());

    expect(EM.on('baz', jest.fn())).toEqual(
      new Error('Max listeners (3) for event "baz" has reached.'),
    );
  });

  it('1.8: should show number of listeners.', () => {
    const EM = new EventEmitter();
    const numberOfListeners = 3;

    expect(EM.listenersNumber('baz')).toBe(0);
    EM.on('baz', jest.fn());
    EM.on('baz', jest.fn());
    EM.on('baz', jest.fn());
    expect(EM.listenersNumber('baz')).toBe(numberOfListeners);
  });

  it('1.9: should throw Error if callback already exists.', () => {
    const EM = new EventEmitter();
    const callback = (): 'foo' => 'foo';

    EM.on('baz', callback);
    expect(EM.on('baz', callback)).toEqual(
      new Error(`Event "baz" already has the callback ${callback}.`),
    );
  });

  it('1.10: it should not delete callback if no event found.', () => {
    const EM = new EventEmitter();
    const callback = jest.fn();

    EM.on('baz', callback);
    EM.off('foo', callback);
    EM.emit('baz');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("1.11: it shouldn't delete callback if callback are not equals.", () => {
    const EM = new EventEmitter();
    const callback = jest.fn();

    EM.on('baz', callback);
    EM.off('baz', jest.fn());
    EM.emit('baz');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
