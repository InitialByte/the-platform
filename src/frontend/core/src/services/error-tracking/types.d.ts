declare namespace Platform {
  type TMessage = string | any[];

  interface IErrorTracking {
    error(errorCode: number, message?: TMessage): void;
    table(message: TMessage): void;
    info(message: TMessage): void;
  }

  interface IError {
    code: E_CODE;
    type: keyof typeof E_TYPE;
    title: string;
  }
}