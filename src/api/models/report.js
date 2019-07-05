import user from './user';

export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Reports', {
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
    reportedArticleSlug: {
      type: DataTypes.STRING,
      references: {
        model: 'Articles',
        key: 'slug'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    reasonId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reasons',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    }
  });
  Report.removeAttribute('id');
  Report.associate = ({ User, Article, Reason }) => {
    Report.belongsTo(User, { foreignKey: 'userId' });
    Report.belongsTo(Article, { foreignKey: 'reportedArticleSlug' });
    Report.belongsTo(Reason, { foreignKey: 'reasonId' });
  };
  return Report;
};
