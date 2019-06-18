export default {
	up: (queryInterface,
		Sequelize) => queryInterface.createTable('articles',
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
			title: {
				type:
						Sequelize.STRING
			},
			description: {
				type:
						Sequelize.STRING
			},
			body: {
				type:
						Sequelize.TEXT
			},
			tagList: {
				type: Sequelize.ARRAY(Sequelize.TEXT),
				allowNull: false,
			},
			readTime: {
				type:
						Sequelize.INTEGER
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
	down: queryInterface => queryInterface.dropTable('articles')
};
