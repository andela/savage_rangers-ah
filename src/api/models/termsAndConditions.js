export default (sequelize, DataTypes) => {
  const TermsAndCondition = sequelize.define('TermsAndConditions',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      termsAndConditions: { type: DataTypes.TEXT, allowNull: false }
    },
    {
      tableName: 'TermsAndConditions'
    });

  return TermsAndCondition;
};
