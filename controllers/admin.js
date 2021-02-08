const bcrypt = require('bcrypt'); // 引入 bcrypt 用於 hash 密碼
const saltRounds = 10; // 複雜程度(加鹽)
const db = require('../models'); // 引入完成 ORM 的 models
const { Admin, Lottery, Menu, Faq } = db;

// fetch
const fetch = require('node-fetch');
const FormData = require('form-data');

function fetchToImgur(encode_image) {
  //const albumID = ''
  const formData = new FormData();
  formData.append('image', encode_image);
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID ef0e0fd605be920',
    },
    body: formData,
  })
    .then((response) => {
      //  判斷 status
      const { status } = response;
      //  status 正常，將 response 轉為 json 格式後回傳
      if (status >= 200 && status < 400) {
        return response.json();
      }
      //  status 有誤，丟出錯誤後終止程式碼
      throw new Error(status);
      //  server 無正確回應，例如錯誤網址直接找不到 server 或連線異常等
    })
    .catch((error) => {
      console.log(error);
    });
}

// controller 負責串接 model 及 render
const adminController = {
  login: (req, res) => res.render('admin/login'),
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    //  空值檢查
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next(); //  將控制權移交給下個 middleware -> goback
    }
    try {
      const admin = await Admin.findOne({
        where: {
          username,
        },
      });
      // 找不到該名 user 時回傳值為 null
      if (!admin) {
        req.flash('errorMessage', '帳號不存在');
        return next();
      }
      //  找到資料時回傳值為該名使用者在資料庫中儲存的資料
      //  檢查目前輸入的密碼 hash 後是否與資料庫內的值相同
      bcrypt.compare(password, admin.password, (err, isValid) => {
        // result == true 時驗證相等
        if (err || !isValid) {
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        //  驗證成功
        req.session.username = admin.username;
        req.flash('successMessage', '登入成功！');
        return res.redirect('/admin');
      });
      return true;
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleLogout: (req, res) => {
    req.session.username = null;
    req.flash('successMessage', '登出成功！');
    return res.redirect('/');
  },
  register: (req, res) => res.render('admin/register'),
  handleRegister: (req, res, next) => {
    const { username, password } = req.body;
    //  空值檢查
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    //  先將密碼做 hash 處理，完成後執行 callback 寫入資料庫
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // 處理完畢後才會進入 callback 開始比對
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      try {
        const admin = await Admin.create({
          username,
          password: hash, // hash 結果
        });
        //  確認寫入完成後設置 session 並導至後台首頁
        req.session.username = username;
        req.flash('successMessage', '註冊成功！');
        return res.redirect('/admin');
      } catch (error) {
        const { errno } = error.original;
        if (errno === 1062) {
          // 欄位值重複
          req.flash('errorMessage', '此帳號名稱已被使用');
        } else {
          // 捕捉其他預期外的錯誤並印出
          req.flash('errorMessage', error.toString());
          console.log(error.toString());
          return res.render('admin/admin_index', {
            errorMessage,
          });
        }
        return next();
      }
    });
  },
  //  獎項管理
  adminLottery: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const lotteries = await Lottery.findAll();
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (lotteries.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何獎項，請先新增獎項';
        return res.render('admin/admin_lottery', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_lottery', {
        lotteries,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin_index', {
        errorMessage,
      });
    }
  },
  deleteLottery: (req, res, next) => {
    Lottery.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        req.flash('successMessage', '刪除獎項成功！');
        return res.redirect('/admin/admin_lottery');
      }) //  成功則導回首頁
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  addLottery: async (req, res, next) => {
    const { name, content, chance } = req.body;
    //  空值檢查
    if (!name || !content || !chance) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 機率檢查
    let reg = new RegExp('^([1-9]|[1-9]\\d|100)$');
    if (!reg.test(chance)) {
      req.flash('errorMessage', '獎項加權數不符規定');
      return next();
    }
    // 上傳檢查
    if (!req.file) {
      req.flash('errorMessage', '未上傳圖片或格式不符');
      return next();
    }
    const encode_image = req.file.buffer.toString('base64');
    const result = await fetchToImgur(encode_image);
    Lottery.create({
      name,
      content,
      chance,
      imageURL: result.data.link,
    })
      .then(() => {
        req.flash('successMessage', '新增獎項成功！');
        return res.redirect('/admin/admin_lottery');
      })
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
  },
  updateLottery: async (req, res, next) => {
    const { id } = req.params;
    try {
      const lottery = await Lottery.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateLottery', {
        lottery,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateLottery: async (req, res, next) => {
    const { name, content, chance } = req.body;
    //  空值檢查
    if (!name || !content || !chance) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 機率檢查
    if (chance >= 100) {
      req.flash('errorMessage', '機率權重超過100，請重新修正');
      return next();
    }
    // 上傳檢查
    if (!req.file) {
      req.flash('errorMessage', '未上傳圖片或格式不符');
      return next();
    }
    const encode_image = req.file.buffer.toString('base64');
    try {
      const result = await fetchToImgur(encode_image);
      await Lottery.update(
        {
          name,
          content,
          chance,
          imageURL: result.data.link,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      req.flash('successMessage', '編輯獎項成功！');
      return res.redirect('/admin/admin_lottery');
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  //  Menu 管理
  adminMenu: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const menus = await Menu.findAll({
        order: [['sequence', 'ASC']],
      });
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (menus.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何菜單，請先新增';
        return res.render('admin/admin_menu', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_menu', {
        menus,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin_menu', {
        errorMessage,
      });
    }
  },
  deleteMenu: (req, res, next) => {
    Menu.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        req.flash('successMessage', '刪除菜單成功！');
        return res.redirect('/admin/admin_menu');
      }) //  成功則導回
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  addMenu: async (req, res, next) => {
    const { name, price, sequence } = req.body;
    //  空值檢查
    if (!name || !price || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 上傳檢查
    if (!req.file) {
      req.flash('errorMessage', '未上傳圖片或格式不符');
      return next();
    }
    const encode_image = req.file.buffer.toString('base64');
    const result = await fetchToImgur(encode_image);
    Menu.create({
      name,
      price,
      sequence,
      url: result.data.link,
    })
      .then(() => {
        req.flash('successMessage', '新增菜單成功！');
        return res.redirect('/admin/admin_menu');
      })
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
  },
  updateMenu: async (req, res, next) => {
    const { id } = req.params;
    try {
      const menu = await Menu.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateMenu', {
        menu,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateMenu: async (req, res, next) => {
    const { name, price, sequence } = req.body;
    //  空值檢查
    if (!name || !price || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 上傳檢查
    if (!req.file) {
      req.flash('errorMessage', '未上傳圖片或格式不符');
      return next();
    }
    const encode_image = req.file.buffer.toString('base64');
    try {
      const result = await fetchToImgur(encode_image);
      await Menu.update(
        {
          name,
          price,
          sequence,
          url: result.data.link,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      req.flash('successMessage', '編輯菜單成功！');
      return res.redirect('/admin/admin_menu');
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  adminFaq: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const faqs = await Faq.findAll({
        order: [['sequence', 'ASC']],
      });
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (faqs.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何常見問題，請先新增';
        return res.render('admin/admin_faq', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_faq', {
        faqs,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin_faq', {
        errorMessage,
      });
    }
  },
  addFaq: async (req, res, next) => {
    const { name, content, sequence } = req.body;
    //  空值檢查
    if (!name || !content || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Faq.create({
      name,
      content,
      sequence,
    })
      .then(() => {
        req.flash('successMessage', '新增常見問題成功！');
        return res.redirect('/admin/admin_faq');
      })
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
  },
  deleteFaq: (req, res, next) => {
    Faq.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        req.flash('successMessage', '刪除常見問題成功！');
        return res.redirect('/admin/admin_faq');
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  updateFaq: async (req, res, next) => {
    const { id } = req.params;
    try {
      const faq = await Faq.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateFaq', {
        faq,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateFaq: async (req, res, next) => {
    const { name, content, sequence } = req.body;
    //  空值檢查
    if (!name || !content || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Faq.update(
      {
        name,
        content,
        sequence,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        req.flash('successMessage', '編輯常見問題成功！');
        //  成功則導回首頁
        return res.redirect('/admin/admin_faq');
      })
      .catch((err) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
};

module.exports = adminController;
