import {customRequest, CONST_URL, ResponsePromise} from '@the_platform/core';

export const signIn = (json: {
  email: string;
  password: string;
}): ResponsePromise => customRequest.post(CONST_URL.URL_AUTH_BASIC, {json});

export const signOut = (): ResponsePromise =>
  customRequest.get(CONST_URL.URL_AUTH_LOGOUT);

export const updatePassword = (json: {
  password: string;
  passwordRepeat: string;
}): ResponsePromise =>
  customRequest.post(CONST_URL.URL_AUTH_UPDATE_PASSWORD, {json});

export const recoveryPassword = (json: {email: string}): ResponsePromise =>
  customRequest.post(CONST_URL.URL_AUTH_RECOVERY_PASSWORD, {json});

export const register = (json: {
  email: string;
  password: string;
  fullName: string;
}): ResponsePromise => customRequest.post(CONST_URL.URL_AUTH_REGISTER, {json});
