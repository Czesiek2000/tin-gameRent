const express = require('express');
const router = express.Router();

const historyApi = require('../../api/historyAPI');

router.get('/', historyApi.getHistory);

module.exports = router;