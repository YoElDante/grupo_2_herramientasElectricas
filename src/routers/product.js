// Cristian
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/create',productController.create);
router.get('/edit',productController.edit);

module.exports = router;