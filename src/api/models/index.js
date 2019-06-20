import Sequelize from 'sequelize';
import env from '../../configs/environments';

const sequelize = new Sequelize(env.dbUrl, {
  logging: false,
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
<<<<<<< HEAD
  Article: sequelize.import('./article'),
  Category: sequelize.import('./category'),
  Rating: sequelize.import('./rating'),
  Token: sequelize.import('./token')
=======
  Token: sequelize.import('./token'),
  Article: sequelize.import('./article'),
  SequelizeMeta: sequelize.import('./sequelizemeta')
>>>>>>> [chore #166841614] Configure migrations with the current codebase
};
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };

export default models;
