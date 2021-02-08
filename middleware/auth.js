const checkIsLogin = (req, res, next) => {
  // 沒有登入就導到登入頁
  if (!req.session.username) {
    req.flash('errorMessage', '您無操作權限，請登入管理後台');
    return res.redirect('/admin/login');
  }
  // 有登入就放行交給後續 controller
  return next();
};

module.exports = {
  checkIsLogin,
};
