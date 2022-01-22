const express = require('express');
const router = express.Router();

const userApiController = require('../../api/userAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', userApiController.getUsers);
router.get('/:id', userApiController.getUserById);
router.post('/', userApiController.createUser);
router.put('/:id', userApiController.updateUser);
// router.delete('/:id', isAuth, userApiController.deleteUser);
router.delete('/:id', userApiController.deleteUser);

module.exports = router;