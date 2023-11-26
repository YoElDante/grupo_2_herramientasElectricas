const express = require('express');
const router = express.Router();
const path = require('node:path');
const productDetailController = require ('../controllers/productDetailController.js')

router.get('/', productDetailController.index);

module.exports = router;