export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token',
    {
      data: DataTypes.TEXT
    },
    {});
  return Token;
};
