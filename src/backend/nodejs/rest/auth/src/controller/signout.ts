// import {connectRedis} from '@the_platform/nodejs-core';

export const signoutController = (_, res): void => {
  res.status(200).json({
    data: 'it works',
  });
  /* const {set} = connectRedis();

  set('key', 'value2')
    .catch(console.error)
    .finally((): void => {
      res.status(200).json({
        data: 'Auth. Logout',
      });
    }); */
};
