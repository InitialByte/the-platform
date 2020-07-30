import {customRequest, CONST_URL} from '@the_platform/core';

export const signIn = (payload: any) => {
  console.log('customRequest', customRequest);
  return customRequest.post(CONST_URL.URL_AUTH_BASIC, {json: payload});
};

export const signOut = () => customRequest.get(CONST_URL.URL_AUTH_LOGOUT);
