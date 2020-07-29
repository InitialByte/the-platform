/*
 * Guaranteeing a constant flow of executions every X milliseconds.
 *
 * Usage:
 * in most cases with scroll actions.
 *
 * NOTE:
 * If your JS function is "painting" or animating directly properties,
 * use requestAnimationFrame at everything that
 * involves re-calculating element positions.
 *
 * When your function recalculates and renders elements
 * on screen and you want to guarantee smooth changes or animations.
 */

type TNoop = () => void;

export function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
