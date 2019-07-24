import user from './user';
import eventEmitter from '../../helpers/event.emitter';

export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Reports',
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
    },
    {
      hooks: {
        afterCreate: async (report) => {
          const currentData = report.get();
          if (currentData) {
            eventEmitter.emit('reportArticle', currentData.reportedArticleSlug);
          }
        }
      }
    });
  Report.removeAttribute('id');
  Report.associate = ({ User, Article, Reason }) => {
    Report.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    Report.belongsTo(Article, { foreignKey: 'reportedArticleSlug', targetKey: 'slug' });
    Report.belongsTo(Reason, { foreignKey: 'reasonId', targetKey: 'id' });
  };
  return Report;
};
