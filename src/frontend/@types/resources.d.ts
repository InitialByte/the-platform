declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.css';
declare module '*.module.css' {
  const exports: {[exportName: string]: string};
  export = exports;
}

declare module '@the_platform/routes';
