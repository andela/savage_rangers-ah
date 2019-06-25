import connection from '../configs/redisConfigs';

const BlackToken = token => connection.set(token, 'dropped');

export default BlackToken;
