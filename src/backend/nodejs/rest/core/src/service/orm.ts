import {Pool} from 'pg';

const settings = {
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(settings);

pool.on('error', (err: Error): void => {
  console.error(err);
});

/* 
  export const query = (sqlQuery: string, rowMode: string = 'array') => {
      const client = await pool.connect();
      const result = client.query({
        rowMode,
        text: sqlQuery,
      });
  
      client.release();
      return result;
  };
*/
