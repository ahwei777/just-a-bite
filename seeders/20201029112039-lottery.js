'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Lotteries',
      [
        {
          name: '頭獎',
          content: '頂級 Prime 肋眼牛排',
          imageURL: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
          chance: '10',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '貳獎',
          content: '創意日式定食',
          imageURL: 'https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
          chance: '20',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '參獎',
          content: '嘿嘿巧克力蛋糕',
          imageURL: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
          chance: '30',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '安慰獎',
          content: '小呀小蘋果',
          imageURL: 'https://images.pexels.com/photos/209449/pexels-photo-209449.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
          chance: '40',
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
