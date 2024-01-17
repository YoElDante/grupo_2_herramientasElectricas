
const express = require('express');
const router = express.Router();
const path = require('node:path');
const usersController = require ('../controllers/usersController.js')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let folder = path.join(__dirname,'../public/img/users')
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        let imageName = "user "+Date.now()+path.extname(file.originalname);
        cb: (null, imageName)      
    }
});

const upload = multer ({storage:storage});
// rutas

router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', upload.single("imagen"), usersController.create);

router.get('/edition/:id', usersController.editionForm);
router.put('/edition/:id', usersController.editionStore);

router.delete('/:id',usersController.delete);

module.exports = router;