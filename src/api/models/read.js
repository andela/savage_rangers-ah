export default (sequelize, DataTypes) => {
  const Read = sequelize.define('Reads', {
    articleSlug: {
      type: DataTypes.STRING,
      references: { model: 'Articles', key: 'slug' }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    userIp: DataTypes.STRING,
    userAgent: DataTypes.STRING
  }, {});
  Read.associate = function(models) {
    Read.belongsTo(models.Article, {
      foreignKey: 'articleSlug'
    });
    Read.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Read;
};
