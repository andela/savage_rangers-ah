import { hashSync, genSaltSync } from 'bcrypt';
import env from '../../configs/environments';

const salt = genSaltSync(parseFloat(env.hashRounds));
const hashedPassword = hashSync('password23423', salt);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        username: 'Premices',
        email: 'premices@gmail.com',
        firstName: 'Prémices',
        lastName: 'Kamasuwa',
        profileImage: 'defaultAvatar.jpg',
        role: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
