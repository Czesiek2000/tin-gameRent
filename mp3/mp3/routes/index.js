var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const langController = require('../controllers/langController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main', message: req.query.message });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/changeLang/:lang', langController.changeLang);

module.exports = router;
