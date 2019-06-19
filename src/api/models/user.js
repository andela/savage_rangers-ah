import { hashSync, genSaltSync } from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate(user) {
          const { BCRYPT_HASH_ROUNDS } = process.env;
          const { password } = user;
          const salt = genSaltSync(parseFloat(BCRYPT_HASH_ROUNDS || 10));
          const hashedPassword = hashSync(password, salt);
          user.password = hashedPassword;
        }
      }
    });
  User.associate = () => {};
  User.findByEmail = (email) => {
    const queryResult = User.findOne({
      where: { email }
    });

    return queryResult;
  };
  return User;
};
