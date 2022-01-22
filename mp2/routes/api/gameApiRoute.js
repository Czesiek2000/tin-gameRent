const express = require('express');
const router = express.Router();

const gameApiController = require('../../api/gameAPI');

router.get('/', gameApiController.getGames);
router.get('/:id', gameApiController.getGameById);
router.post('/', gameApiController.createGame);
router.put('/:id', gameApiController.updateGame);
router.delete('/:id', gameApiController.deleteGame);

module.exports = router;