# Just A Bite 餐廳官網 & 管理後台

> 網站連結：https://restaurant.ahwei777.tw  
```
後台功能測試：
  帳號：admin
  密碼：admin
```
![](https://github.com/ahwei777/for-GaGiO-README/blob/main/restaurant/restaurant-wholePage.jpg?raw=true)

## 索引
- [簡介](#簡介)
- [功能介紹](#功能介紹)
- [使用技術](#使用技術)
- [Demo](#Demo)
- [專案架構](#專案架構)
- [專案安裝流程](#專案安裝流程)
- [聲明](#聲明)
- [版本紀錄](#版本紀錄)
- [資料來源](#資料來源)

## 簡介

此作品為 [Lidemy mentor-program-4th](https://github.com/Lidemy/mentor-program-4th) 的課程作業之一，利用 Express.js 建構 MVC 網站，以 Sequelize ORM 操作資料庫，並配合 bcrypt, session, multer 等 middleware 實作常見功能，畫面部分由 EJS 模板引擎動態產生。具備基本前後台常見功能。

## 功能介紹

### 訪客
- 瀏覽菜單
- 瀏覽常見問題
- 參加線上抽獎
- 註冊管理員

### 管理員
- 登入／登出管理後台
- 新增／更新／刪除菜單（可上傳圖片）
- 新增／更新／刪除常見問題
- 新增／更新／刪除抽獎品項（可上傳圖片）

## 使用技術
- 後端框架
    - Express.js
- 其他套件
    - bcrypt - 密碼雜湊處理。
    - connect-flash - 管理跨頁面資訊傳遞，如登入狀態及成功／錯誤訊息等。
    - express-session - 保持登入者身分狀態。
    - EJS - 作為模板引擎，依據資料動態產生網頁。
    - multer - 實作圖片上傳功能。
    - sequelize & sequelize-cli - 使用 ORM 方式操作資料庫並提升建構速度。
- RWD - 網頁排版自適應主要瀏覽器

## DEMO

### 瀏覽菜單
![]()

### 瀏覽常見問題
![]()

### 參加線上抽獎
![]()

### 註冊管理員
![]()

### 新增／更新／刪除菜單（可上傳圖片）
![]()

### 新增／更新／刪除常見問題
![]()

### 新增／更新／刪除抽獎品項（可上傳圖片）
![]()

## 專案架構

```
├── config/                    # 資料庫連線設定
├── controllers/               # 處理資料互動邏輯
├── middleware/                # 自定義 middleware
├── migrations/                # 資料庫變動紀錄
├── models/                    # 定義資料庫模型與關聯
├── routes/                    # 子路由設定
├── seeders/                   # demo 資料
├── static/                    # 靜態資源（.css／.scss／.js／圖片）
├── views/                     # 畫面模板（.ejs）
├── index.js                   # 程式主要入口點
├── package.json               # module 及 script 設定
├── package-lock.json
└── README.md
```

## 專案安裝流程

1. clone 此專案至本機
``` 
$ git clone https://github.com/ahwei777/just-a-bite.git
```

2. 安裝相依套件
```
$ npm install
```

3. 建立 config/config.json，輸入本機資料庫帳號密碼及資料庫名稱
```
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

4. 建立環境變數檔案 .env，內容為：
```
SECRET='自行輸入任意長度字元'
```

5. 於本機建立與 config.json 內同名資料庫

6. 於資料庫中建立 table
```
$ npm run migrate
```

7. 於資料庫中插入初始 demo 資料
```
$ npm run seed
```

8. 環境設置完畢，於本機運行專案（預設 port:3002）
```
$ npm run start
```

## 聲明
本專案僅作為個人練習用途，註冊時請勿使用任何真實資料。另本作品所包含之圖片與內容不作任何商業用途使用。

[MIT](https://choosealicense.com/licenses/mit/)

## 版本紀錄

- 1.0 - 2021.02.08
	- 完成基本功能

## 資料來源

- [Unsplash](https://unsplash.com/)
- [Favicon.io](https://favicon.io/)
- [Lidemy 程式導師計畫](https://bootcamp.lidemy.com/)