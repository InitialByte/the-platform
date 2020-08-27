import {customRequest, CONST_URL, ResponsePromise} from '@the_platform/core';

export const signIn = (json: Record<string, unknown>): ResponsePromise =>
  customRequest.post(CONST_URL.URL_AUTH_BASIC, {json});

export const signOut = (): ResponsePromise =>
  customRequest.get(CONST_URL.URL_AUTH_LOGOUT);
