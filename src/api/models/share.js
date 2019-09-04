export default (sequelize, DataTypes) => {
  const Share = sequelize.define('Share',
    {
      articleSlug: {
        type: DataTypes.STRING,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'slug'
        }
      },
      sharedOn: {
        type: DataTypes.STRING,
        onDelete: 'CASCADE',
        allowNull: false
      }
    },
    {});
  Share.associate = ({ Article }) => {
    Share.belongsTo(Article, { foreignKey: 'articleSlug' });
  };
  return Share;
};
