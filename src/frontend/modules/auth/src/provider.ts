import {customRequest, CONST_URL} from '@the_platform/core';

export const signIn = (json: any): any =>
  customRequest.post(CONST_URL.URL_AUTH_BASIC, {json});

export const signOut = (): any => customRequest.get(CONST_URL.URL_AUTH_LOGOUT);
