const express = require('express'); // Cristian
const router = express.Router(); // Cristian
const path = require('path'); // Cristian
const productController = require('../controllers/productController.js'); // Cristian

const multer = require('multer'); // Cristian
const storage = multer.diskStorage({ // Cristian
    destination: (req, file, cb)=>{
        const folder = path.resolve(__dirname, '../../public/img/multerProducts');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        const imgName = Date.now() + path.extname(file.originalname);
        cb(null, imgName);
    }
});
const imgUpload = multer({storage: storage}); // Cristian

router.get('/create', productController.create); // Cristian
router.post('/create', imgUpload.single('image'), productController.createOk); // Cristian

router.get('/edit/:id', productController.edit); // Cristian
router.put('/edit/:id', imgUpload.single('image'), productController.editOk); // Cristian

module.exports = router; // Cristian