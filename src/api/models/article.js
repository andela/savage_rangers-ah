const article = (sequelize, DataTypes) => {
  const Article = sequelize.define('Articles', {
    content: {
      type: DataTypes.STRING,
    }
  });

  return Article;
};

export default article;
