
import Sequelize from 'sequelize';
import environments from '../../configs/environements';

const env = environments.currentEnv;

const sequelize = new Sequelize(env.dbUrl, {
  logging: false
});

const models = {
  User: sequelize.import('./user'),
  Token: sequelize.import('./token'),
};

export { sequelize };

export default models;
