export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notifications',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('seen', 'unseen'),
        allowNull: false,
        defaultValue: 'unseen'
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'inApp'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Notification;
};
