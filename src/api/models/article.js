const Article = (sequelize, DataTypes) => {
  const article = sequelize.define('Article',
    {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tagList: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      }
    },
    {});

  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'userId' });
    Article.hasOne(models.Rating, { foreignKey: 'articleSlug' });
  };
  return article;
};

export default Article;
