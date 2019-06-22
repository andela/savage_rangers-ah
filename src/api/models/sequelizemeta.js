export default (sequelize, DataTypes) => {
  const SequelizeMeta = sequelize.define('SequelizeMeta',
    {
      name: DataTypes.STRING
    },
    {});
  return SequelizeMeta;
};
