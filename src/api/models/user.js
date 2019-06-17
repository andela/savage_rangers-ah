import { hashSync, genSaltSync } from 'bcrypt';

export default (sequelize, DataTypes) => {
	const User = sequelize.define('User',
		{
			id: {
				allowNull: false,
				unique: true,
				primaryKey: true,
				type:
					DataTypes.UUID,
				defaultValue:
					DataTypes.UUIDV4
			},
			username: {
				type:
					DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			email: {
				type:
					DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type:
					DataTypes.STRING,
				allowNull: false
			},
			verified: {
				type:
					DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false
			}
		},
		{
			tableName:
				'users',
			hooks: {
				beforeCreate(user) {
					const {
						BCRYPT_HASH_ROUNDS
					} = process.env;
					const {
						password
					} = user;
					const salt = genSaltSync(parseFloat(BCRYPT_HASH_ROUNDS
								|| 10));
					const hashedPassword = hashSync(password,
						salt);
					user.password = hashedPassword;
				}
			}
		});
	User.associate = ({
		Article
	}) => {
		User.hasMany(Article,
			{
				foreignKey:
					'userId',
				as:
					'author',
				onDelete:
					'CASCADE',
				hooks: true
			});
	};
	return User;
};
