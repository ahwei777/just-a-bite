require('dotenv').config();
// 占用的 port
const port = process.env.PORT || 3005;
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
  })
);
// connect-flash 設定
app.use(flash());
//  設置 middleware 偵測所有 request 並於 locals 內儲存 session, flash, url 等訊息，類似全域變數可供所有 views 存取，省去在每個路由再額外傳遞
app.use((req, res, next) => {
  res.locals.username = req.session.username; // render 時依據權限決定顯示項目
  res.locals.successMessage = req.flash('successMessage'); // 成功訊息傳遞
  res.locals.errorMessage = req.flash('errorMessage'); // 錯誤訊息傳遞
  res.locals.url = req.originalUrl; // 依據訪問 url 在 navbar 中提示當前頁面
  next();
});

// 靜態資源路徑設定
app.use(express.static(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 設定 MVC 結構及 routes
const lotteriesApiRoutes = require('./routes/lotteriesApiRoutes');
const normalPageRoutes = require('./routes/normalPageRoutes')
const adminPageRoutes = require('./routes/adminPageRoutes')

// API
app.use('/lotteries-api', lotteriesApiRoutes);
// 一般頁面
app.use('/', normalPageRoutes);
// admin 頁面
app.use('/admin', adminPageRoutes);

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
