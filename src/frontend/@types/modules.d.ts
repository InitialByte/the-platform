declare module 'i18next-browser-languagedetector';
declare module '@the_platform/routes';
declare module 'clsx' {
  type ClassValue =
    | string
    | number
    | ClassDictionary
    | ClassArray
    | undefined
    | null
    | boolean;

  interface ClassDictionary {
    [id: string]: any;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ClassArray extends Array<ClassValue> {}

  type ClassNamesFn = (...classes: ClassValue[]) => string;

  type ClassNamesExport = ClassNamesFn & {default: ClassNamesFn, };

  const classNames: ClassNamesExport;

  export = classNames;
}
