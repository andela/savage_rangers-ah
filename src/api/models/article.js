const Article = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    }
  }, {});
  return article;
};

export default Article;
