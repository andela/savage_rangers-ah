
export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Likes', {
    reaction: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: 'userId' });
    Like.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Like;
};
