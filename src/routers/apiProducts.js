const express = require('express');
const router = express.Router();

const apiProductsController = require('../controllers/apiProductsController.js');

router.get('/products', apiProductsController.products);
router.get('/products/:id', apiProductsController.detail);

module.exports = router;