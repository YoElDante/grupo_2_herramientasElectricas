const express = require('express'); // Cristian
const path = require('path'); // Cristian
const fs = require('fs'); // Cristian
const productsFilePath = path.join(__dirname, '../database/products.json'); // Cristian
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // Cristian


const controller = { // Cristian
    create: (req, res)=>{
        res.render(path.resolve(__dirname,'../views/products/productCreate.ejs'))
    },
    createOk: (req, res)=>{
        res.send("Todo marcha bien Milhouse");
    },
    edit: (req, res)=>{
        for(let i=0; i<products.length; i++){
			if(products[i].id == (req.params).id){
                res.render(path.resolve(__dirname,'../views/products/productEdit.ejs'), {product: products[i]})
			}
		}
    },
    editOk: (req, res)=>{
        res.send("Todo marcha bien Milhouse");
    }
};

module.exports = controller; // Cristian