export default {
	up: (queryInterface,
		Sequelize) => queryInterface.createTable('users',
		{
			id: {
				allowNull: false,
				unique: true,
				primaryKey: true,
				type:
						Sequelize.UUID,
				defaultValue:
						Sequelize.UUIDV4
			},
			username: {
				type:
						Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			email: {
				type:
						Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type:
						Sequelize.STRING,
				allowNull: false
			},
			verified: {
				type:
						Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type:
						Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type:
						Sequelize.DATE
			}
		}),
	down: queryInterface => queryInterface.dropTable('users')
};
