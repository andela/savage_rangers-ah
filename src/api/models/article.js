import slug from 'slug';

const THIRTY_SIX = 36;
const SIX = 6;
const ZERO = 0;

export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Articles',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false },
      coverImage: { type: DataTypes.TEXT, allowNull: false },
      author: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      category: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' }
      }
    },
    {
      tableName: 'articles',
      paranoid: true,
      hooks: {
        beforeCreate(article) {
          article.slug = slug(`${article.title}-${(Math.random() * THIRTY_SIX ** SIX || ZERO).toString(THIRTY_SIX)}`).toLowerCase();
        }
      }
    });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
      hooks: true
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Article;
};
