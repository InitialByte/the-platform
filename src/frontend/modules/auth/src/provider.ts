import {request, CONST_URL} from '@the_platform/core';

export const signIn = (payload: any) =>
  request.post(CONST_URL.URL_AUTH_BASIC, {json: payload});

export const signOut = () => request.get(CONST_URL.URL_AUTH_LOGOUT);
