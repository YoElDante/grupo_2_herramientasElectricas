const express = require('express');
const router = express.Router();
const usersController = require ('../controllers/usersController.js')

const logined = require('../middlewares/loginedMiddleware.js');
const logouted = require('../middlewares/logoutedMiddleware.js');
const upload = require('../middlewares/multerUsersMiddleware');

// rutas

router.get('/login',logouted, usersController.login);
router.post('/login',usersController.loginOk);

router.get('/register', logouted, usersController.register);
router.post('/register', upload.single("image"), usersController.create);

router.get('/edition/:id',logined, usersController.editionForm);
router.put('/edition/:id', usersController.editionStore);

router.delete('/:id',logined, usersController.delete);

module.exports = router;