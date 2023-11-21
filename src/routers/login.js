const express = require('express');
const router = express.Router();
const path = require('node:path');
const loginController = require ('../controllers/loginController.js')

router.get('/', loginController.index);

module.exports = router;