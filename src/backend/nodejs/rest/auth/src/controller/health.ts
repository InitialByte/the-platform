// import {httpCodes} from '@the_platform/core';

export const healthController = (_, res): void => {
  res.status(200).json({
    data: 'it works',
  });
};