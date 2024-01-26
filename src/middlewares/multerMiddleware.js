const express = require('express');
const path = require('node:path');
const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: (req, file, cb)=>{
        const folder = path.resolve(__dirname, '../../public/img/products');
        cb(null, folder);
    },
    filename: (req, file, cb)=>{
        const imgName = Date.now() + path.extname(file.originalname);
        cb(null, imgName);
    }
});

const imgUpload = multer({storage: storage});

module.exports = imgUpload;