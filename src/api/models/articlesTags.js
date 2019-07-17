export default (sequelize, DataTypes) => {
  const ArticlesTag = sequelize.define('ArticlesTags', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tags',
        key: 'id'
      }
    }
  });

  return ArticlesTag;
};
