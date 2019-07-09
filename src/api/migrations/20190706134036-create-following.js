import { sequelize } from '../models'
export default {
 up: (queryInterface, Sequelize) => {
   return queryInterface
     .createTable("followings", {
       follower: {
         type: Sequelize.STRING,
         references: {
           model: "Users",
           key: "username"
         },
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
         allowNull: false
       },
       following: {
         type: Sequelize.STRING,
         references: {
           model: "Users",
           key: "username"
         },
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
         allowNull: false
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
       }
     })
     .then(() =>
       queryInterface
         .addConstraint("followings", ["follower", "following"], {
           type: "primary key",
           name: "followId"
         })
         .then(() =>
         sequelize.query(`ALTER TABLE followings ADD CONSTRAINT following_cannot_be_equal_to_follower_CHK CHECK (following <> follower)`)
         )
     );
 },
 down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable("followings");
  }
};
