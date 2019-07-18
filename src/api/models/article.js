import slug from 'slug';

const slugRandomNumberOne = 36;
const slugRandomNumberTwo = 6;
const SlugDefaultNumber = 0;

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
      description: { type: DataTypes.TEXT},
      body: { type: DataTypes.TEXT},
      slug: { type: DataTypes.STRING, allowNull: false },
      readTime: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      coverImage: { type: DataTypes.TEXT },
      author: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      category: {
        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' }
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'draft'
      }
    },
    {
      tableName: 'Articles',
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate(article) {
          article.slug = slug(`${article.title}-${(
            Math.random() * slugRandomNumberOne ** slugRandomNumberTwo || SlugDefaultNumber
          ).toString(slugRandomNumberOne)}`).toLowerCase();
        }
      }
    });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'author',
      targetKey: 'id',
      onDelete: 'CASCADE',
      hooks: true
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'category',
      as: 'Category',
      onDelete: 'CASCADE',
      hooks: true
    });
    Article.hasMany(models.Highlight, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE'
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE',
      sourceKey: 'slug'
    });
    Article.hasMany(models.Bookmark, {
      foreignKey: 'articleSlug',
      sourceKey: 'slug',
      onDelete: 'CASCADE',
      hooks: true
    });
    Article.belongsToMany(models.Tag, {
      through: 'ArticlesTags',
      foreignKey: 'articleId'
    });
    Article.hasMany(models.Read, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE',
    });
  };

  return Article;
};
