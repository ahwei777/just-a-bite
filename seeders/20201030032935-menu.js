'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Menus',
      [
        {
          name: '輕盈高麗卷湘南',
          price: '250',
          url: 'https://i.imgur.com/2R2Rcad.png',
          sequence: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '六彩雙茄起司沙拉',
          price: '300',
          url: 'https://i.imgur.com/4mrgHNw.png',
          sequence: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '小菜一盤',
          price: '100',
          url: 'https://i.imgur.com/s0cdtZM.png',
          sequence: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '鮮嫩洋芋白丁佐莎莎',
          price: '200',
          url: 'https://i.imgur.com/DHrJFtE.png',
          sequence: '4',
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
  }
};
