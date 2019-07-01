export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'normal'
    }),
    queryInterface.addColumn('Users', 'isBlocked', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  ]);
}
export function down(queryInterface) {
  return Promise.all([
    queryInterface.removeColumn('Users', 'role'),
    queryInterface.removeColumn('Users', 'isBlocked')
  ]);
}
