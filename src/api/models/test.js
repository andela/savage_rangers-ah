const test = (sequelize, DataTypes) => {
  const Test = sequelize.define('test', {
    message: DataTypes.STRING,
  });

  return Test;
};

export default test;
