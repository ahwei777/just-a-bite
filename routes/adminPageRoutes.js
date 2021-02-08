const express = require('express');
const adminPageRoutes = express.Router();
const adminController = require('../controllers/admin');
const { checkIsLogin } = require('../middleware/auth');
const multer = require('multer'); //  處理檔案上傳後放進 req 中供後端存取
// multer 設定
const upload = multer({
  fileFilter: (req, file, cb) => {
    console.log('type', file.mimetype)
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
adminPageRoutes.get('/lottery', checkIsLogin, adminController.adminLottery);
adminPageRoutes.get('/lottery/add', checkIsLogin, (req, res) => {
  res.render('admin/admin_addLottery');
});
adminPageRoutes.post('/lottery/add', checkIsLogin, upload.single('file'), adminController.addLottery, redirectBack);
adminPageRoutes.get('/lottery/delete/:id', checkIsLogin, adminController.deleteLottery, redirectBack);
adminPageRoutes.get('/lottery/update/:id', checkIsLogin, adminController.updateLottery, redirectBack);
adminPageRoutes.post(
  '/lottery/update/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateLottery,
  redirectBack
);

// 後台 - menu
adminPageRoutes.get('/menu', checkIsLogin, adminController.adminMenu, redirectBack);
adminPageRoutes.get('/menu/add', checkIsLogin, (req, res) => {
  res.render('admin/admin_addMenu');
});
adminPageRoutes.post('/menu/add', checkIsLogin, upload.single('file'), adminController.addMenu, redirectBack);
adminPageRoutes.get('/menu/delete/:id', checkIsLogin, adminController.deleteMenu, redirectBack);
adminPageRoutes.get('/menu/update/:id', checkIsLogin, adminController.updateMenu, redirectBack);
adminPageRoutes.post(
  '/menu/update/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateMenu,
  redirectBack
);

// 後台 - faq
adminPageRoutes.get('/faq', checkIsLogin, adminController.adminFaq, redirectBack);
adminPageRoutes.get('/faq/add', checkIsLogin, (req, res) => {
  res.render('admin/admin_addFaq');
});
adminPageRoutes.post('/faq/add', checkIsLogin, adminController.addFaq);
adminPageRoutes.get('/faq/delete/:id', checkIsLogin, adminController.deleteFaq);
adminPageRoutes.get('/faq/update/:id', checkIsLogin, adminController.updateFaq);
adminPageRoutes.post('/faq/update/:id', checkIsLogin, adminController.handleUpdateFaq);

module.exports = adminPageRoutes;
