const express = require('express'); 
const path = require('path'); 
const fs = require('fs'); 

const productsFilePath = path.join(__dirname, '../database/products.json'); 
const productsJSON = fs.readFileSync(productsFilePath, 'utf-8'); 
const products = JSON.parse(productsJSON); 

const controller = {
    
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'), {products});
    },

};

module.exports = controller;