
import Sequelize from 'sequelize';
import environments from '../../configs/environnements';

const env = environments.currentEnv;

const sequelize = new Sequelize(env.dbUrl, {
  logging: false
});

const models = {
  Test: sequelize.import('./test'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
