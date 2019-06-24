module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    queryInterface.bulkInsert('Users',
      [
        {
          username: 'BurindiAlain4',
          email: 'alain1@gmail.com',
          password: 'password23423',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    queryInterface.bulkDelete('Users', null, {})
};
