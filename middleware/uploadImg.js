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

module.exports = {
  upload,
};
