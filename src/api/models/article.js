const article = (Sequelize, DataTypes) => {
  const Article = Sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    tag: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    }
  });

  return Article;
};

export default article;
