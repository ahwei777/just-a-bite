'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Faqs',
      [
        {
          name: '如何辦理退貨？',
          content: '敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~',
          sequence: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '目前提供哪些付款方式？',
          content: '敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~',
          sequence: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '線上刷卡如何操作呢？',
          content: '敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~',
          sequence: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '如何查詢目前訂單的處理情況？',
          content: '敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~',
          sequence: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '訂單成立後，是否可以取消或是更改訂單數量及商品？',
          content: '敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~敬請期待~~',
          sequence: 5,
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
