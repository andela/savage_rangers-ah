const article = (sequelize, DataTypes) => {
  const Article = sequelize.define('Likes', {
    reaction: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'userId' });
    Article.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Article;
};

export default article;
