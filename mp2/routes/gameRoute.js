const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/gamesController');

router.get('/', gamesController.showGames)
router.get('/add', gamesController.showGameAddForm);
router.get('/edit/:id', gamesController.showEditGameForm);
router.get('/details/:id', gamesController.showGameDetails)
router.post('/add', gamesController.addGame);
router.post('/edit/', gamesController.updateGame);
router.get('/delete/:id', gamesController.deleteGame);

module.exports = router;