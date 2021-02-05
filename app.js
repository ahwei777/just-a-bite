//require('dotenv').config();
// 占用的 port
const port = 3005;
// 引入所有相關套件
// express 框架
const express = require('express');
// body-parser 解析 request
const bodyParser = require('body-parser');
// session 身分驗證
const session = require('express-session');
// connect-flash 暫存網站提示訊息
const flash = require('connect-flash');
//  加載靜態資源的文件夾，將 CSS 等文件放在此 static 資料夾底下
const path = require('path');
//  處理檔案上傳後放進 req 中供後端存取
const multer = require('multer');

// express 設定
const app = express(); //  建立 express 模組
app.set('view engine', 'ejs'); // 指定 view 引擎
// body-parser 設定
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded 解析透過瀏覽器提交的 POST 表單
// session 設定
app.use(
  session({
    // session 參數
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  }),
);
// connect-flash 設定
app.use(flash());
//  設置 middleware 偵測所有 request 並於 locals 內儲存 session, flash, url 等訊息，類似全域變數可供所有 views 存取，省去在每個路由再額外傳遞
app.use((req, res, next) => {
  res.locals.username = req.session.username; // render 時依據權限決定顯示項目
  res.locals.errorMessage = req.flash('errorMessage'); // 錯誤訊息傳遞
  res.locals.url = req.originalUrl; // 依據訪問 url 在 navbar 中提示當前頁面
  next();
});

// 靜態資源路徑設定
app.use(express.static(path.join(__dirname, './static')));

// multer 設定
var upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Allowed only .png'));
    }
  },
  storage: multer.memoryStorage(),
  limit: {
    // 限制上傳檔案的大小為 1MB
    fileSize: 1000000,
  },
});

// 設定 MVC 結構及訪問路由導向
const pageController = require('./controllers/page');
const adminController = require('./controllers/admin');
const lotteriesController = require('./controllers/lotteries_API');

// 抽獎API, 回傳抽獎品項的名字、圖片還有說明
//  抽獎 GET
app.get('/lotteries', lotteriesController.get);
//  刪除 DELETE
app.delete('/lotteries/:id', lotteriesController.delete);
//  新增 POST
app.post('/lotteries', lotteriesController.add);
//  更新 PATCH
app.patch('/lotteries/:id', lotteriesController.update);

//  根目錄
app.get('/', (req, res) => {
  res.redirect('/index');
});
app.get('/index', (req, res) => {
  res.render('index');
});

// 函式：程序有狀況時將控制權轉交 redirectBack 導回上一頁
function redirectBack(req, res) {
  return res.redirect('back');
}
// 函式：權限檢查
function checkIsLogin(req, res, next) {
  // 沒有登入就導到登入頁
  if (!req.session.username) {
    req.flash('errorMessage', '您無操作權限，請登入管理後台');
    return res.redirect('/login');
  }
  // 有登入就放行交給後續 controller
  return next();
}

// 一般頁面
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/lottery', (req, res) => {
  res.render('lottery');
});
app.get('/order', pageController.order, redirectBack);
app.get('/faq', pageController.faq, redirectBack);

// adminController
app.get('/login', adminController.login);
app.post('/login', adminController.handleLogin, redirectBack);
app.get('/logout', adminController.handleLogout);
app.get('/register', adminController.register);
app.post('/register', adminController.handleRegister, redirectBack);

app.get('/admin', checkIsLogin, (req, res) => {
  res.render('admin/admin');
});
app.get('/admin_lottery', checkIsLogin, adminController.adminLottery);
app.get('/addLottery', checkIsLogin, (req, res) => {
  res.render('admin/admin_addLottery');
});
// 上傳圖片後寫入資料庫
app.post(
  '/addLottery',
  checkIsLogin,
  upload.single('file'),
  adminController.addLottery,
  redirectBack,
);
app.get(
  '/deleteLottery/:id',
  checkIsLogin,
  adminController.deleteLottery,
  redirectBack,
);
app.get(
  '/updateLottery/:id',
  checkIsLogin,
  adminController.updateLottery,
  redirectBack,
);
app.post(
  '/updateLottery/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateLottery,
  redirectBack,
);

app.get('/admin_menu', checkIsLogin, adminController.adminMenu, redirectBack);

app.get('/addMenu', checkIsLogin, (req, res) => {
  res.render('admin/admin_addMenu');
});
// 上傳圖片後寫入資料庫
app.post(
  '/addMenu',
  checkIsLogin,
  upload.single('file'),
  adminController.addMenu,
  redirectBack,
);
app.get('/deleteMenu/:id', checkIsLogin, adminController.deleteMenu, redirectBack);
app.get('/updateMenu/:id', checkIsLogin, adminController.updateMenu, redirectBack);
app.post(
  '/updateMenu/:id',
  checkIsLogin,
  upload.single('file'),
  adminController.handleUpdateMenu,
  redirectBack,
);

//app.get('/admin_menu', checkIsLogin, adminController.adminMenu);
app.get('/admin_faq', checkIsLogin, adminController.adminFaq, redirectBack);
app.get('/addFaq', checkIsLogin, (req, res) => {
  res.render('admin/admin_addFaq');
});
app.post('/addFaq', checkIsLogin, adminController.addFaq);
app.get('/deleteFaq/:id', checkIsLogin, adminController.deleteFaq);
app.get('/updateFaq/:id', checkIsLogin, adminController.updateFaq);
app.post('/updateFaq/:id', checkIsLogin, adminController.handleUpdateFaq);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 輸出函式供 render 時使用
// 根據當前 url 將對應按鈕設為 active
app.locals.getActiveFromURL = (url, str) => {
  if (url.includes(str)) {
    return 'active';
  }
  return true;
};
// 根據當前 url 設定頁面標題
app.locals.getTitle = (url) => {
  const prefix = 'Just A Bite!';
  if (url.includes('index')) {
    return `${prefix} - 首頁`;
  } else if (url.includes('lottery')) {
    return `${prefix} - 抽個大獎`;
  } else if (url.includes('order')) {
    return `${prefix} - 我要點餐`;
  } else if (url.includes('faq')) {
    return `${prefix} - 常見問題`;
  } else if (url.includes('register')) {
    return `${prefix} - 後台註冊`;
  } else if (url.includes('login')) {
    return `${prefix} - 後台登入`;
  } else if (url.includes('admin')) {
    return `${prefix} - 後台管理`;
  } else {
    return prefix;
  }
};
