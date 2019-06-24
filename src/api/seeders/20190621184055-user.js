import { hashSync, genSaltSync } from 'bcrypt';
import env from '../../configs/environments';

const salt = genSaltSync(parseFloat(env.hashRounds));
const hashedPassword = hashSync('password23423', salt);

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    queryInterface.bulkInsert('Users',
      [
        {
          username: 'Burindy',
          email: 'alain1@gmail.com',
          password: hashedPassword,
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
