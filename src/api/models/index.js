import Sequelize from 'sequelize';
import env from '../../configs/environments';

const sequelize = new Sequelize(env.dbUrl, {
  logging: false,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Article: sequelize.import('./article'),
  Category: sequelize.import('./category'),
  Rating: sequelize.import('./rating'),
  Report: sequelize.import('./report'),
  Reason: sequelize.import('./reasons'),
  Highlight: sequelize.import('./highlight')
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
