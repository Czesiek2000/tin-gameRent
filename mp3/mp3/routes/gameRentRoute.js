const express = require('express');
const router = express.Router();

const gameRentController = require('../controllers/gameRentController');

router.get('/', gameRentController.showGameRent)
router.get('/add', gameRentController.showGameRentAddForm);
router.get('/edit/:id', gameRentController.showGameRentEditForm);
router.get('/details/:id', gameRentController.showGameRentDetails);
router.post('/add', gameRentController.addGameRent);
router.post('/edit/', gameRentController.updateGameRent);
router.get('/delete/:id', gameRentController.deleteGameRent);

module.exports = router;