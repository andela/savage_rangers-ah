import { hashSync, genSaltSync } from 'bcrypt';
import env from '../../configs/environments';

const salt = genSaltSync(parseFloat(env.hashRounds));
const hashedPassword = hashSync('password23423', salt);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        username: 'Burindi',
        email: 'alain1@gmail.com',
        firstName: 'Alain',
        lastName: 'Burindi',
        profileImage: 'defaultAvatar.jpg',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain2',
        email: 'alain2@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain3',
        email: 'alain3@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain44',
        email: 'alain44@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'burundi',
        lastName: 'DieHard',
        username: 'BurindiAlain5',
        email: 'alain5@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain6',
        email: 'alain6@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain7',
        email: 'alain7@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain8',
        email: 'alain8@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain9',
        email: 'alain9@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain10',
        email: 'alain10@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain11',
        email: 'alain11@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain12',
        email: 'alain12@gmail.com',
        role: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain13',
        email: 'alain13@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain14',
        email: 'alain14@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain15',
        email: 'alain15@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain16',
        email: 'alain16@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain17',
        email: 'alain17@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain18',
        email: 'alain18@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain19',
        email: 'alain19@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain20',
        email: 'alain20@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain21',
        email: 'alain21@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain22',
        email: 'alain22@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain23',
        email: 'alain23@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain24',
        email: 'alain24@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain25',
        email: 'alain25@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain26',
        email: 'alain26@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain27',
        email: 'alain27@gmail.com27',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain28',
        email: 'alain28@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain29',
        email: 'alain29@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain30',
        email: 'alain30@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain31',
        email: 'alain31@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain32',
        email: 'alain32@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain33',
        email: 'alain33@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain34',
        email: 'alain34@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain35',
        email: 'alain35@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain36',
        email: 'alain36@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain37',
        email: 'alain37@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain38',
        email: 'alain38@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'BurindiAlain39',
        email: 'alain39@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'daniel',
        email: 'danny@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
