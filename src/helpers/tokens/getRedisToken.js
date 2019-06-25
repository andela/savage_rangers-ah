import pino from 'pino';
import connect from '../../configs/redisConfigs';

const logs = pino();
const isTokenDropped = token => new Promise((resolve, reject) => {
  try {
    connect.get(token, (err, reply) => {
      logs.info(reply);
      resolve(reply);
    });
  } catch (error) {
    reject(error);
  }
});

export default isTokenDropped;
