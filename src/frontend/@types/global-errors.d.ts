// DON'T FORGET TO ADD THE SAME VALUES FROM E_TYPE AND E_CODE
// INTO <root>/src/frontend/react/web-desktop/src/global.ts

// eslint-disable-next-line @typescript-eslint/naming-convention
declare enum E_TYPE {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  NOTICE = 'NOTICE',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare enum E_CODE {
  E_1 = 1,
  E_100 = 100,
  E_101 = 101,
  E_102 = 102,
}
