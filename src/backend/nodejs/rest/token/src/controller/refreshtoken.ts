import {createJwtToken} from '@the_platform/nodejs-core';

export const updateTokenController = (_, res): void => {
  res.status(200).json({
    data: createJwtToken(),
  });
};
