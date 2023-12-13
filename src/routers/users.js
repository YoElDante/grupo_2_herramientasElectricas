
const express = require('express');
const router = express.Router();
const path = require('node:path');
const usersController = require ('../controllers/usersController.js')

// rutas

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', usersController.create);

router.get('/edition/:id', usersController.editionForm);
router.put('/edition/:id', usersController.editionStore);

router.delete('/:id',usersController.delete);

module.exports = router;