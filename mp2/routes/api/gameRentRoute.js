const express = require('express');
const router = express.Router();

const gameRentApiController = require('../../api/gameRentAPI');

router.get('/', gameRentApiController.getGameRents);
router.get('/:id', gameRentApiController.getGameRentById);

module.exports = router;