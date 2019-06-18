/* eslint-disable no-unused-vars */

export default {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('articles', [{
		id: '5f13a96d-f247-4ed1-bf0e-502fd3135609',
		title: 'How to create sequalize seeds',
		description: 'How to set dummy data automatically',
		body: 'Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.Let\'s create a seed file which will add a demo user to our User table.',
		tagList: ['postgres', 'express', 'sequelize'],
		createdAt: new Date(),
		updatedAt: new Date()
	}], {}),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('articles', null, {})
};
