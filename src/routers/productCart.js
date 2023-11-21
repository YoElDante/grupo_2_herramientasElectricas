const express = require('express');
const router = express.Router();
const path = require('node:path');
const productCartController = require ('../controllers/productCartController.js')

router.get('/', productCartController.index);

module.exports = router;