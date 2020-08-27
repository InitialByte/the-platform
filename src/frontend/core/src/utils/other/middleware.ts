type TNoop = () => void;
type TFn = TNoop | TNoop[];

export class Middleware {
  // Add function or array of functions to the execution stack.
  use(fn: TFn) {
    if (fn instanceof Array) {
      fn.forEach((fn) => this.use(fn));
      return this;
    }

    if (typeof fn !== 'function') {
      throw new TypeError();
    }

    // LIFO.
    this.run = ((stack: any) => (next: any) =>
      stack(() =>
        fn.call(this.context || this, next.bind(this.context || this))))(this.run);

    return this;
  }

  // Set context for MW's functions.
  setContext(context: any): any {
    this.context = context;

    return this;
  }

  // Run stack of middlewares.
  run(next: TNoop): TNoop {
    return next();
  }
}
