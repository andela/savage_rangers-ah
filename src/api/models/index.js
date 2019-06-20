import Sequelize from 'sequelize';
import env from '../../configs/environments';

const sequelize = new Sequelize(env.dbUrl, {
  logging: false,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Article: sequelize.import('./article'),
  Rating: sequelize.import('./rating')
};

export { sequelize };

export default models;
