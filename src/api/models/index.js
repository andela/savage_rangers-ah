import Sequelize from 'sequelize';
import env from '../../configs/environments';

const sequelize = new Sequelize(env.dbUrl, {
  logging: false,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Token: sequelize.import('./token'),
  Article: sequelize.import('./article')
};

export { sequelize };

export default models;
