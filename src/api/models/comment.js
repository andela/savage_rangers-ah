import eventEmitter from '../../helpers/event.emitter';

export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
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
      parentCommentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      iteration: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
      },
      isEdited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      freezeTableName: true,
      hooks: {
        afterBulkUpdate: (data) => {
          if (data.attributes.isBlocked) {
            eventEmitter.emit('blockComment', 'block', data.where.id);
          } else eventEmitter.emit('unblockComment', 'unblock', data.where.id);
        }
      }
    });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleSlug', targetKey: 'slug' });
    Comment.belongsTo(models.Comment, {
      foreignKey: 'parentCommentId',
      targetKey: 'parentCommentId'
    });
    Comment.hasMany(models.Comment, {
      foreignKey: 'parentCommentId',
      sourceKey: 'id',
      as: 'Replies'
    });
    Comment.hasMany(models.Reaction, {
      foreignKey: 'commentId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      hooks: true
    });

    Comment.belongsToMany(models.Reason, {
      foreignKey: 'reportedCommentId',
      through: 'ReportComments'
    });
  };
  return Comment;
};
