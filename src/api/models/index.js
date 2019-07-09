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
  Share: sequelize.import('./share'),
  Highlight: sequelize.import('./highlight'),
  Following: sequelize.import('./following'),
  Comment: sequelize.import('./comment'),
  Bookmark: sequelize.import('./bookmark'),
  Tag: sequelize.import('./tag'),
  ArticleTag: sequelize.import('./articlesTags'),
  TermsAndConditions: sequelize.import('./termsAndConditions'),
  Reaction: sequelize.import('./reactions'),
  Rating: sequelize.import('./rating'),
  Read: sequelize.import('./read'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
