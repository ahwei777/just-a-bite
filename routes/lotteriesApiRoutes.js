const express = require('express');
//const { checkAuth } = require('../middleware/auth');
const lotteriesApiRoutes = express.Router();
const lotteriesController = require('../controllers/lotteriesApi');
const { checkIsLogin } = require('../middleware/auth');

// 抽獎API, 回傳抽獎品項的名字、圖片還有說明
lotteriesApiRoutes.get('/', lotteriesController.get);
lotteriesApiRoutes.post('/', checkIsLogin, lotteriesController.add);
lotteriesApiRoutes.delete('/:id', checkIsLogin, lotteriesController.delete);
lotteriesApiRoutes.patch('/:id', checkIsLogin, lotteriesController.update);

module.exports = lotteriesApiRoutes;
