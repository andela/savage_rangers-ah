export default (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    userId: 
    { 
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleSlug: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'slug'
      }
    } ,
    sharedOn: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      allowNull: false
    }
  }, {});
  Share.associate = ({ User, Article }) => {
    Share.belongsTo(User, { foreignKey: 'userId'});
    Share.belongsTo(Article, { foreignKey: 'articleSlug'});
  };
  return Share;
};
