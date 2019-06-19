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
      description: { type: DataTypes.TEXT, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false },
      coverImage: { type: DataTypes.TEXT, allowNull: false },
      tagList: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
      },

      author: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      coverImage: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      tagList: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' }
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
      onDelete: 'CASCADE',
      hooks: true
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'category',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Article;
};
