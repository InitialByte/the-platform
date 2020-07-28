import {createClient} from 'redis';
import {promisify} from 'util';

export const connectRedis = (): any => {
  const redisClient = createClient({
    port: 1000,
    host: 'localhost',
    db: 0,
  });
  const get = promisify(redisClient.get).bind(redisClient);
  const set = promisify(redisClient.set).bind(redisClient);

  redisClient.on('error', console.error);

  return {
    get,
    set,
  };
};
