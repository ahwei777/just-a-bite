'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Faqs',
      [
        {
          name: '購物流程說明',
          content: '簡單又安全的購物流程，不需加入會員即可進行訂購，親切易懂的指引式流程畫面，讓您充分享受便利的購物樂趣。',
          sequence: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '目前提供哪些付款方式？',
          content: '目前提供付款方式有四種：『超商取貨』付款、『信用卡』付款、『ATM』付款、『超商代碼』付款。',
          sequence: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '如何查詢目前訂單的處理情況？',
          content: '請點選「目錄」＞＞「會員登入」，輸入您的E-mail及密碼登入後，點選「目錄」＞＞「訂單」即可查詢該訂單的處理狀態。',
          sequence: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '訂單成立後，是否可以取消、加訂、修改商品數量與尺寸呢？',
          content: '請點選「會員登入」，輸入您的E-mail及密碼登入後，即可查詢該訂單的處理狀態。如欲修改訂單請直接連絡客服人員取消訂單，重新下訂即可。為避免影響商品庫存及避免帳務錯誤，請恕我們無法為您再將訂單「修改」或「加購」或「合併」訂單商品喔。',
          sequence: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '我想購買的商品已經缺貨，什麼時候會進貨呢？',
          content: '如商品頁面按鈕顯示「聯絡店主」，請您點選該按鈕並填寫您的電子郵件，商品到貨後系統會依登記順序及到貨數量陸續發送E-mail通知（部份熱賣商品，如到貨數量＜貨到通知數量，則有可能無法收到通知）。',
          sequence: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '如何計算「七天鑑賞期」？',
          content: '根據消費者保護法之規定，GOSHOP提供您享有商品到貨的七日鑑賞期權益，是由消費者完成簽收取件的隔日開始算起至第7天止（如您的收件地址有管理員代收，則以代收的隔日起算喔，請留意送件通知），為七日鑑賞期限。例如，完成簽收的時間是04/11，其七天鑑賞期起訖日即為04/12~04/18。您如欲辦理退貨需於「04/18前」至與客服連絡提出退貨申請，並於二日內至7-11辦理退貨。',
          sequence: 6,
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
