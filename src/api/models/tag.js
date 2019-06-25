export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tags',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: 'Tags'
    });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Article, {
      through: 'ArticlesTags',
      foreignKey: 'tagId'
    });
  };
  return Tag;
};
