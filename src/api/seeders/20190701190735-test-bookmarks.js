export default {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Bookmarks', [{
   articleSlug:'How-to-create-sequalize-seeds',
   username:'BurindiAlain2',
   createdAt: new Date(),
   updatedAt: new Date()
  },
  {
    articleSlug:'How-to-create-sequalize-seedss',
    username:'BurindiAlain2',
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
