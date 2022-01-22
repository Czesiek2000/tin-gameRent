const express = require('express');
const router = express.Router();

const userApiController = require('../../api/userAPI');

router.get('/', userApiController.getUsers);
router.get('/:id', userApiController.getUserById);
router.post('/', userApiController.createUser);
router.put('/:id', userApiController.updateUser);
router.delete('/:id', userApiController.deleteUser);

module.exports = router;