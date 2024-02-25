const express = require('express');
const router = express.Router();
const usersController = require ('../controllers/usersController.js');

//Validations
const userLoginValidations = require ('../validations/userLoginValidator.js')
const userRegisterValidations = require ('../validations/userRegisterValidator.js')
const userUpdateValidations = require ('../validations/userUpdateValidations.js')

//Middlewares
const logined = require('../middlewares/loginedMiddleware.js');
const logouted = require('../middlewares/logoutedMiddleware.js');
const upload = require('../middlewares/multerUsersMiddleware');

//Rutas

//Login
router.get('/login',logouted, usersController.login);
router.post('/login',userLoginValidations,usersController.loginConfirm);

//Register - Crear nuevo usuario
router.get('/register', logouted, usersController.register);
router.post('/register',userRegisterValidations, upload.single("image"), usersController.createNewUser);

//Edicion de Usuario
router.get('/profile/:id',logined, usersController.editionForm);
router.put('/profile/update/:id', userUpdateValidations ,upload.single("image"), usersController.editionConfirm);

//Borrar Usuario
router.delete('/profile/delete/:id',logined, usersController.delete);

//Logout
router.get('/logout',logined, usersController.logout);


module.exports = router;