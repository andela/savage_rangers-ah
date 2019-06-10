const token = (sequelize, DataTypes) => {
  const Token = sequelize.define('Tokens', {
    data: {
      type: DataTypes.TEXT,
    }
  });
  return Token;
};

export default token;
