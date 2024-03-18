const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController.js');
const imgUpload = require('../middlewares/multerMiddleware.js');
const logined = require ('../middlewares/loginedMiddleware.js');
const productValidator = require('../validations/productValidator.js');

// rutas
router.get('/',productsController.index);

router.get('/create', logined, productsController.create);
router.post('/create', imgUpload.array('image'), productValidator, productsController.createOk); // Cristian: 20-02-24 Le puse comillas a (image).

router.get('/edit/:id', logined, productsController.edit);
router.put('/edit/:id', imgUpload.array('image'), productValidator, productsController.editOk); // Cristian: 20-02-24 Le puse comillas a (image).

router.delete('/:id', logined, productsController.delete);

//router.get('/create', productsController.create); // Cristian: 20-02-24 Esta linea no deberia existir, por estar diplicada. Ver linea 11 (router.get('/create', logined, productsController.create);).
//router.post('/create', imgUpload.array('image'), productsController.createOk); // Cristian: 20-02-24 Esta linea no deberia existir, por estar diplicada. Ver linea 12 (router.post('/create', imgUpload.array(image), productsController.createOk);).

//router.get('/edit/:id', productsController.edit); // Cristian: 20-02-24 Esta linea no deberia existir, por estar diplicada. Ver linea 14 (router.get('/edit/:id', logined, productsController.edit);).
//router.put('/edit/:id', imgUpload.array('image'), productsController.editOk); // Cristian: 20-02-24 Esta linea no deberia existir, por estar diplicada. Ver linea 15 (router.put('edit/:id', imgUpload.array(image), productsController.editOk);).

//router.delete('/:id', productsController.delete); // Cristian: 20-02-24 Esta linea no deberia existir, por estar diplicada. Ver linea 17 (router.delete('/:id', logined, productsController.delete);).

router.get('/detail/:id', productsController.detail); // Cristian: 20-02-24 Borre un signo de exclamacion ('/detail/:id?').

router.get('/cart', logined, productsController.cart);

module.exports = router;

