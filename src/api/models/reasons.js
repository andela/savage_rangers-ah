export default (sequelize, DataTypes) => {
  const Reasons = sequelize.define('Reasons',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {});
  Reasons.associate = ({ Report, ReportedComment }) => {
    Reasons.hasMany(Report, {
      foreignKey: 'reasonId',
      sourceKey: 'id',
      onDelete: 'cascade'
    });

    Reasons.hasMany(ReportedComment, {
      foreignKey: 'reasonId',
      sourceKey: 'id',
      onDelete: 'cascade'
    });
  };
  return Reasons;
};
