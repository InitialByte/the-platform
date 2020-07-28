import {createJwtToken} from '@the_platform/nodejs-core';

export const signinController = (_, res): void => {
  // 1. Отослать сообщение в кафку при успешном логине
  // 2. Осослать сообщение в кафку при неуспешном логине
  res.status(200).json({
    data: createJwtToken(),
  });
};
