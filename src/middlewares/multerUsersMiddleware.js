const express = require ('express');
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../../public/img/users')
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let imageName = "user" + Date.now() + path.extname(file.originalname);
        cb(null, imageName)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;