import eventEmitter from '../../helpers/event.emitter';

export default (sequelize, DataTypes) => {
  const ReportedComment = sequelize.define('ReportComments',
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
      reportedCommentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comments',
          key: 'id'
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
            eventEmitter.emit('reportComment', currentData.reportedCommentId);
          }
        }
      }
    });
  ReportedComment.removeAttribute('id');
  ReportedComment.associate = ({ User, Comment, Reason }) => {
    ReportedComment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    ReportedComment.belongsTo(Comment, { foreignKey: 'reportedCommentId', targetKey: 'id' });
    ReportedComment.belongsTo(Reason, { foreignKey: 'reasonId', targetKey: 'id' });
  };
  return ReportedComment;
};
