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
    /*
  can't throw an error under normal conditions unless there is no internet
  */
    /* istanbul ignore next  */
    reject(error);
  }
});

export default isTokenDropped;
