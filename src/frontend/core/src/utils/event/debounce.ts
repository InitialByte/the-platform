//
// Debouncing will bunch a series of sequential calls to a function
// into a single call to that function. It ensures that one notification
// is made for an event that fires multiple times.
//
// Usage:
// * in most cases with resize actions,
// * sending any request to the server, e.g. search with auto-filling.
//

/**
 * A function that emits a side effect and does not return anything.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TNoop = (...args: any[]) => void;
export interface TOptions {
  isImmediate: boolean;
}

const TIMEOUT = 50;

export function debounce<F extends TNoop>(
  func: F,
  waitFor: number = TIMEOUT,
  options: TOptions = {
    isImmediate: false,
  },
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function debounceFn(
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const doLater = function doLater(): void {
      timeoutId = undefined;

      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitFor);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
}
