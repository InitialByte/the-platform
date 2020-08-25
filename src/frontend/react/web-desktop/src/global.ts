export {};

// DON'T FORGET TO ADD THE SAME VALUES FROM E_TYPE AND E_CODE
// INTO <root>/src/frontend/@types/global-errors.d.ts

enum E_TYPE {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  NOTICE = 'NOTICE',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN',
}

enum E_CODE {
  E_1 = 1,
  E_100 = 100,
  E_101 = 101,
  E_102 = 102,
}

window.E_TYPE = E_TYPE;
window.E_CODE = E_CODE;

declare global {
  interface Window {
    E_CODE: typeof E_CODE;
    E_TYPE: typeof E_TYPE;
  }
}
