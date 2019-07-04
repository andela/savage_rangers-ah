export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Ratings',
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      articleSlug: {
        type: DataTypes.STRING,
        references: {
          model: 'Articles',
          key: 'slug'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER
      }
    },
    {
      freezeTableName: true
    });

  Rating.removeAttribute('id');
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, { foreignKey: 'userId' });
    Rating.belongsTo(models.Article, { foreignKey: 'articleSlug' });
  };
  return Rating;
};
