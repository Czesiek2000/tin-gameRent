const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.showUsers)
router.get('/add', usersController.showUsersAddForm);
router.get('/edit/:id', usersController.showEditUserForm)
router.get('/details/:id', usersController.showUserDetails)
router.post('/add', usersController.addUser)
router.post('/edit/', usersController.updateUser)
router.get('/delete/:id', usersController.deleteUser)

module.exports = router;