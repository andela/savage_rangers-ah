import Sequelize from 'sequelize';
import environments from '../../configs/environments';

const env = environments.currentEnv;

const sequelize = new Sequelize(env.dbUrl, {
  logging: false
});

const models = {
  User: sequelize.import('./user'),
  Token: sequelize.import('./token'),
  Article: sequelize.import('./article'),
  Like: sequelize.import('./like')
};
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };

export default models;
