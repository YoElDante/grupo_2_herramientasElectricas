const express = require('express'); // Cristian
const path = require('path'); // Cristian
const fs = require('fs'); // Cristian
const productsFilePath = path.join(__dirname, '../database/products.json'); // Cristian
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // Cristian

const controller = { 
    create: (req, res)=>{ // Cristian
        res.render(path.resolve(__dirname,'../views/products/productCreate.ejs'))
    },
    createOk: (req, res)=>{ // Cristian
        const newProduct = {id: products.length+1, ...(req.body)};
        products.push(newProduct);
        //console.log(products);
        res.send("Producto creado correctamente");
    },
    edit: (req, res)=>{ // Cristian
        for(let i=0; i<products.length; i++){
			if(products[i].id == (req.params).id){
                res.render(path.resolve(__dirname,'../views/products/productEdit.ejs'), {product: products[i]})
			}
		}
    },
    editOk: (req, res)=>{ // Cristian
        const productEdit = {id: (req.params).id, ...(req.body)};
        for(let i=0; i<products.length; i++){
			if(products[i].id == (req.params).id){
                products[i] = productEdit;
			}
		}
        //console.log(products);
        res.send("Producto editado correctamente");
    }
};

module.exports = controller; // Cristian