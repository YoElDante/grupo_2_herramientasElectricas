// Cristian y Florencia
const express = require('express'); // Cristian
const path = require('path'); // Cristian
const productsFilePath = path.join(__dirname, '../database/products.json'); // Cristian
const fs = require('fs'); // Cristian
const products = require('../database/services/productsdataAccessService.js');


const controller = {
  index:(req, res) => {
    //Se tiene que renderizar una vista mostrando todos los productos
    //se llama al servicio de productos al metodo getAll
    //se mapea los productos para poderlos mostrar
    //se hace el render a la vista que solo mosestra productos y en el render se manda el array de objetos
    res.render(path.resolve(__dirname, '../views/products/products.ejs') , {products});
  },

  cart: (req, res) => {
    //Esto se debe mover al controller de Orders
    res.render(path.resolve(__dirname, '../views/products/productCart.ejs') , {products});
  },

  detail: (req, res) => {
    //Esto se debe mover al controller de Orders
    res.render(path.resolve(__dirname, '../views/products/productDetail.ejs'), {products});
  },


  //*********************
  //       CREATE
  //*********************

  //GET de la vista
  create: (req, res) => { // Cristian
    res.render(path.resolve(__dirname, '../views/products/productCreate.ejs'))
  },

  //POST
  createOk: (req, res) => { // Cristian

    const newProduct = { id: products.length + 1, ...req.body };


    products.push(newProduct);


    const newProductsJSON = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, newProductsJSON);
    

    res.send("Producto creado correctamente");
  },

  //*********************
  //       UPDATE
  //*********************

  //GET
  edit: (req, res) => { // Cristian
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.params).id) {
        res.render(path.resolve(__dirname, '../views/products/productEdit.ejs'), { product: products[i] })
      }
    }
  },

  //POST
  editOk: (req, res) => {
    const editedProduct = {id: (req.params).id, ...(req.body)};
    for(let i=0; i<products.length; i++){
      if(products[i].id == (req.params).id){
        products.splice(i,1,editedProduct);

        const newProductsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, newProductsJSON);

        res.send("Producto editado correctamente");
      }
    }
  },

  delete: (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex((product) => product.id == productId);

    if (productIndex !== -1) {
      // Borra el producto del array
      products.splice(productIndex, 1);

      // Guarda los cambios en el archivo JSON
      const newProductsJSON = JSON.stringify(products);
      fs.writeFileSync(productsFilePath, newProductsJSON);

      res.send('Producto eliminado correctamente');
    } else {
      res.status(404).send('Producto no encontrado');
    }
  },

};

module.exports = controller;



