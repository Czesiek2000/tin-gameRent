const express = require('express');
const router = express.Router();

const gameRentApiController = require('../../api/gameRentAPI');

router.get('/', gameRentApiController.getGameRents);
router.get('/:id', gameRentApiController.getGameRentById);
router.post('/', gameRentApiController.createGameRent);
router.put('/:id', gameRentApiController.updateGameRent);
router.delete('/:id', gameRentApiController.deleteGameRent);
module.exports = router;