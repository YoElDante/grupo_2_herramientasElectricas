const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController.js');
const imgUpload = require('../middlewares/multerMiddleware.js')

// rutas

router.get('/create', productsController.create); // Cristian
router.post('/create', imgUpload.array('image'), productsController.createOk); // Cristian

router.get('/edit/:id', productsController.edit); // Cristian
router.put('/edit/:id', imgUpload.array('image'), productsController.editOk); // Cristian

router.delete('/:id', productsController.delete);

router.get('/detail/:id?', productsController.detail);

router.get('/cart', productsController.cart);

module.exports = router;

