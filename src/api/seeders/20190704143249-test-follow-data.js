export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "followings",
      [
        {
          follower: "BurindiAlain2",
          following: "Burindi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          follower: "BurindiAlain44",
          following: "BurindiAlain2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          follower: "BurindiAlain3",
          following: "BurindiAlain2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          follower: "BurindiAlain44",
          following: "BurindiAlain3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          follower: "BurindiAlain3",
          following: "BurindiAlain44",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          follower: "BurindiAlain2",
          following: "BurindiAlain44",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("followings", null, {});
  }
};
