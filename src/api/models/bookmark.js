export default (sequelize, DataTypes) => {
  const bookmark = sequelize.define('Bookmark', {
    articleSlug: {
      type: DataTypes.STRING,
      references: {
        model: 'Article',
        key: 'slug'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    }
  }, {});

  bookmark.removeAttribute('id');

  bookmark.associate = (models) => {
    bookmark.belongsTo(models.Article,{
      foreignKey: 'articleSlug',
      targetKey: 'slug',
      onDelete: 'CASCADE',
      hooks: true
    });
    bookmark.belongsTo(models.User,{
      foreignKey: 'username'
    });

  };
  return bookmark;
};
