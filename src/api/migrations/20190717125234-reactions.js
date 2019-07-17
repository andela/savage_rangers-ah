module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.renameTable('LikeDislikes', 'Reactions'),

  down: (queryInterface, Sequelize) => queryInterface.renameTable('Reactions', 'LikeDislikes')
};
