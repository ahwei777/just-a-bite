const express = require('express');
const normalPageRoutes = express.Router();
const pageController = require('../controllers/page');

normalPageRoutes.get('/', (req, res) => res.render('index'));
normalPageRoutes.get('/lottery', (req, res) => res.render('lottery'));
normalPageRoutes.get('/order', pageController.order);
normalPageRoutes.get('/faq-list', pageController.faq);

module.exports = normalPageRoutes;
