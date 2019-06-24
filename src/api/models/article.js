export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    content: DataTypes.STRING
  }, {});
  return Article;
};
