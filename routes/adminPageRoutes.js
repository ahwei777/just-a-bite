const express = require('express');
const adminPageRoutes = express.Router();
const adminController = require('../controllers/admin');
const { checkIsLogin } = require('../middleware/auth');
const multer = require('multer'); //  處理檔案上傳後放進 req 中供後端存取
// multer 設定
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
  storage: multer.memoryStorage(),
  limit: {
    // 限制上傳檔案的大小為 1MB
    fileSize: 1000000,
  },
});
const redirectBack = (req, res) => res.redirect('back');

// 登入/註冊
adminPageRoutes.get('/login', adminController.login);
adminPageRoutes.post('/login', adminController.handleLogin, redirectBack);
adminPageRoutes.get('/logout', adminController.handleLogout);
adminPageRoutes.get('/register', adminController.register);
adminPageRoutes.post('/register', adminController.handleRegister, redirectBack);
adminPageRoutes.get('/', checkIsLogin, (req, res) => {
  res.render('admin/admin_index');
});

// 後台 - lottery
adminPageRoutes.get('/admin_lottery', checkIsLogin, adminController.adminLottery);
adminPageRoutes.get('/addLottery', checkIsLogin, (req, res) => {
  res.render('admin/admin_addLottery');
});
adminPageRoutes.post('/addLottery', checkIsLogin, upload.single('file'), adminController.addLottery, redirectBack);
adminPageRoutes.get('/deleteLottery/:id', checkIsLogin, adminController.deleteLottery, redirectBack);
adminPageRoutes.get('/updateLottery/:id', checkIsLogin, adminController.updateLottery, redirectBack);
adminPageRoutes.post(
  '/updateLottery/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateLottery,
  redirectBack
);

// 後台 - menu
adminPageRoutes.get('/admin_menu', checkIsLogin, adminController.adminMenu, redirectBack);
adminPageRoutes.get('/addMenu', checkIsLogin, (req, res) => {
  res.render('admin/admin_addMenu');
});
adminPageRoutes.post('/addMenu', checkIsLogin, upload.single('file'), adminController.addMenu, redirectBack);
adminPageRoutes.get('/deleteMenu/:id', checkIsLogin, adminController.deleteMenu, redirectBack);
adminPageRoutes.get('/updateMenu/:id', checkIsLogin, adminController.updateMenu, redirectBack);
adminPageRoutes.post(
  '/updateMenu/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateMenu,
  redirectBack
);

// 後台 - 
adminPageRoutes.get('/admin_faq', checkIsLogin, adminController.adminFaq, redirectBack);
adminPageRoutes.get('/addFaq', checkIsLogin, (req, res) => {
  res.render('admin/admin_addFaq');
});
adminPageRoutes.post('/addFaq', checkIsLogin, adminController.addFaq);
adminPageRoutes.get('/deleteFaq/:id', checkIsLogin, adminController.deleteFaq);
adminPageRoutes.get('/updateFaq/:id', checkIsLogin, adminController.updateFaq);
adminPageRoutes.post('/updateFaq/:id', checkIsLogin, adminController.handleUpdateFaq);

module.exports = adminPageRoutes;
