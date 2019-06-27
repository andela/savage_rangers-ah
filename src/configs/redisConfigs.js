import redis from 'redis';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const consoleLog = pino();
const clientConnection = redis.createClient({
  url: process.env.REDIS_URL
});

clientConnection.on('connect', (err) => {
  if (err) {
    consoleLog.error(err);
  }
  consoleLog.info('redis connection is now ON');
});

clientConnection.on('error', (error, res) => {
  if (error) {
    consoleLog.error(error);
  }
  consoleLog.info(res);
});

export default clientConnection;
