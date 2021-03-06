import {debounce} from '../debounce';

describe('1. Debounce.', () => {
  test('it properly debounces function', () => {
    jest.useFakeTimers();

    const func = jest.fn();
    const debouncedFunction = debounce(func, 100);

    debouncedFunction();
    expect(func).not.toBeCalled();

    jest.runTimersToTime(50);
    expect(func).not.toBeCalled();

    jest.runTimersToTime(100);
    expect(func).toBeCalled();
    expect(func.mock.calls.length).toBe(1);
  });

  test('it properly debounces function with isImmediate set to true ', () => {
    jest.useFakeTimers();

    const func = jest.fn();
    const debouncedFunction = debounce(func, 100, {isImmediate: true});

    debouncedFunction();
    expect(func).toBeCalled();
    expect(func.mock.calls.length).toBe(1);

    jest.runTimersToTime(50);
    expect(func.mock.calls.length).toBe(1);

    jest.runTimersToTime(100);
    expect(func.mock.calls.length).toBe(1);
  });
});
