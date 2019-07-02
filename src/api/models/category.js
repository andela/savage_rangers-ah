export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: 'Categories',
      hooks: {
        beforeCreate(category) {
          category.name = category.name.toUpperCase();
        }
      }
    });

  Category.associate = (models) => {
    Category.hasMany(models.Articles, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Category;
};
