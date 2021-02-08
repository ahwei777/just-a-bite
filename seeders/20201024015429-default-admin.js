'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Admins',
      [
        {
          username: 'admin',
          password: '$2b$10$Eo1S2CDqgfNRYjwUsIPZjeGFbtL9t1ot9RaDB1vw20Jy7LsK4Clsy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
