const db = require('../models'); // 引入完成 ORM 的 models
const { Admin, Lottery, Menu, Faq } = db;

// controller 負責串接 model 及 render
const pageController = {
  order: async (req, res, next) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const menus = await Menu.findAll({
        order: [['sequence', 'ASC']],
      });
      // 有資料時回傳資料
      return res.render('order', {
        menus,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('order', {
        errorMessage,
      });
    }
  },
  faq: async (req, res, next) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const faqs = await Faq.findAll({
        order: [['sequence', 'ASC']],
      });
      // 有資料時回傳資料
      return res.render('faq', {
        faqs,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('faq', {
        errorMessage,
      });
    }
  },
};

module.exports = pageController;
