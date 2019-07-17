export default (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reactions',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      commentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Comments', key: 'id' }
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Comments', key: 'id' }
      },
      likes: { type: DataTypes.INTEGER, allowNull: false },
      dislikes: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'Reactions'
    });

  Reaction.associate = (models) => {
    Reaction.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      hooks: true
    });
    Reaction.belongsTo(models.User, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Reaction;
};
