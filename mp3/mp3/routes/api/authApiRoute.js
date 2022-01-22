const express = require('express');
const router = express.Router();

const apiAuth = require('../../api/authAPI');

router.post('/login', apiAuth.login);

module.exports = router;