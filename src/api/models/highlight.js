export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight',
    {
      startIndex: DataTypes.INTEGER,
      lastIndex: DataTypes.INTEGER,
      text: DataTypes.STRING,
      comment: DataTypes.STRING,
      articleSlug: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      nodeId: DataTypes.STRING
    },
    {});
  Highlight.associate = (models) => {
    Highlight.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Highlight.belongsTo(models.Article, {
      foreignKey: 'articleSlug',
      onDelete: 'CASCADE'
    });
  };
  return Highlight;
};
