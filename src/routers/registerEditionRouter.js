const express = require('express');
const router = express.Router();
const path = require('node:path');
const registerEditioController = require ('../controllers/registerEditioController.js')

router.get('/', registerEditioController.index);

module.exports = router;