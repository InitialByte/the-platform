// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// DON'T FORGET TO ADD THE SAME VALUES FROM E_TYPE AND E_CODE
// INTO <root>/src/frontend/core/src/services/error-tracking/global.ts

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
  E_103 = 103,
  E_104 = 104,
}
