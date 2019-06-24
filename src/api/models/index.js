import Sequelize from 'sequelize';
import env from '../../configs/environments';

const sequelize = new Sequelize(env.dbUrl, {
  logging: false,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Token: sequelize.import('./token'),
  Profile: sequelize.import('./profile'),
  SequelizeMeta: sequelize.import('./sequelizemeta')
};
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };

export default models;
