// Cristian y Florencia
const express = require('express'); // Cristian
const path = require('path'); // Cristian
const productsFilePath = path.join(__dirname, '../database/products.json'); // Cristian
const fs = require('fs'); // Cristian
const products = require('../database/services/productsdataAccessService.js');
const productsService = require('../database/services/productsdataAccessService.js'); // Cristian: No me dio el tiempo de implementar esto.
const db = require('../database/models');

const controller = {

  //*********************
  //        HOME
  //*********************
  index:(req, res) => { // Cristian
    db.Product.findAll({
      include: [
        {association: "productBrand"},
        {association: "productImages"}
      ]
    })
    .then((products)=>{ //console.log('products tiene: ' + JSON.stringify(products, null, 2));
      res.render(path.resolve(__dirname, '../views/products/products.ejs'), {products});
    })
  },

  //*********************
  //       ORDERS
  //*********************
  
  cart: (req, res) => {
    //Esto se debe mover al controller de Orders
    res.render(path.resolve(__dirname, '../views/products/productCart.ejs') , {products});
  },
  
  //*********************
  //   Product Detail
  //*********************
  detail: (req, res) => { // Cristian
    //Esto se debe mover al controller de Orders // Cristian: ¿Seguro? Este es el detalle de un "producto".
    db.Product.findByPk(req.params.id, {
      include: [
        {association: "productBrand"},
        {association: "productImages"},
        {association: "productDetail"}
      ]
    })
    .then((product)=>{
      //console.log('Lo que hay en req.params.id es: ' + req.params.id);
      //console.log('Lo que hay en product es: ' + JSON.stringify(product, null, 2));
      //console.log('Lo que hay en product.productBrand es: ' + JSON.stringify(product.productBrand, null, 2));
      //console.log('Lo que hay en product.productImages es: ' + JSON.stringify(product.productImages, null, 2));
      //console.log('Lo que hay en product.productDetail es: ' + JSON.stringify(product.productDetail, null, 2));
      res.render(path.resolve(__dirname, '../views/products/productDetail.ejs'), {product});
      res.status(200)
    })
    .catch((error)=>{
      res.status(500)
    })
  },


  //*********************
  //       CREATE
  //*********************

  //GET de la vista
  create: (req, res) => { // Cristian
    db.ProductBrand.findAll()
    .then((brands)=>{ //console.log(brands);
      res.render(path.resolve(__dirname, '../views/products/productCreate.ejs'),{brands});
      res.status(200)
    })
    .catch((error)=>{
      res.status(500)
    })
  },

  //POST
  createOk: (req, res) => { // Cristian
    /*// Codigo obsoleto.
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    const newProductsJSON = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, newProductsJSON);
    res.send("Producto creado correctamente");*/

    //console.log('req.body tiene: ' + JSON.stringify(req.body, null, 2));
    //console.log('req.files tiene: ' + JSON.stringify(req.files, null, 2));
    db.Product.create({
      name: req.body.name,
      productbrand_id: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      units: req.body.units
    })
    .then((product)=>{ //console.log("El producto creado tiene: " + JSON.stringify(product, null, 2));
      db.ProductDetail.create({
        voltage: req.body.voltage,
        frequency: req.body.frequency,
        power: req.body.power,
        extras: req.body.extras,
        manual: req.body.manual,
        product_id: product.id
      });
      //db.ProductBrand.create({}); // Cristian: Opcional. Quiero agregar marcas a la base de datos.
      for(let file of req.files){
        db.ProductImage.create({
          image: file.filename,
          product_id: product.id
        })
      }
    })
    .then((productCreated)=>{ //console.log('El producto creado tiene: ' + JSON.stringify(productCreated, null, 2));
      res.redirect('/products');
      res.status(200);
    })
    .catch((error)=>{
      res.status(500)
    })
  },

  //*********************
  //       UPDATE
  //*********************

  //GET
  edit: (req, res) => { // Cristian
    /*// Codigo obsoleto.
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == (req.params).id) {
        res.render(path.resolve(__dirname, '../views/products/productEdit.ejs'), { product: products[i] })
      }
    }*/

    const promiseOne = db.Product.findByPk(req.params.id, {
      include: [
        {association: "productBrand"},
        {association: "productImages"},
        {association: "productDetail"}
      ]
    });
    const promiseTwo = db.ProductBrand.findAll();

    Promise.all([promiseOne, promiseTwo])
    .then(([product, brands])=>{ //console.log('Lo que hay en product es: ' + JSON.stringify(product, null, 2));
      res.render(path.resolve(__dirname, '../views/products/productEdit.ejs'), {product, brands});
      res.status(200)
    })
    .catch((error)=>{
      res.status(500)
    })
  },

  //POST
  editOk: (req, res) => { // Cristian
    /*// Codigo obsoleto
    const editedProduct = {id: (req.params).id, ...(req.body)};
    for(let i=0; i<products.length; i++){
      if(products[i].id == (req.params).id){
        products.splice(i,1,editedProduct);
        const newProductsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, newProductsJSON);
        res.send("Producto editado correctamente");
      }
    }*/

    const productUpdated = db.Product.update({
      name: req.body.name,
      productbrand_id: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      units: req.body.units
    },{where: {id: req.params.id}})
    const productDetailUpdated = db.ProductDetail.update({
      voltage: req.body.voltage,
      frequency: req.body.frequency,
      power: req.body.power,
      extras: req.body.extras,
      manual: req.body.manual,
      product_id: req.params.id
    },{where: {product_id: req.params.id}});

    Promise.all([productUpdated, productDetailUpdated])
    .then(()=>{
      for(let file of req.files){
        db.ProductImage.create({
          image: file.filename,
          product_id: req.params.id
        })
      }
    })
    .then(()=>{
      res.redirect('/products/detail/' + req.params.id);
      res.status(200)
    })
    .catch((error)=>{
      res.status(500)
    })
  },

  delete: (req, res) => { // Cristian
    /*// Codigo obsoleto.
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
    }*/

    const productDestroyed = db.Product.destroy({where: {id: req.params.id}});
    const productDetailDestroyed = db.ProductDetail.destroy({where: {product_id: req.params.id}});
    const productImageDestroyed = db.ProductImage.destroy({where: {product_id: req.params.id}});
    
    // Cristian: Aca me gustaria implementar un codigo que elimine los archivos de public/img/products.

    Promise.all([productDestroyed, productDetailDestroyed, productImageDestroyed])
    .then(()=>{
      res.redirect('/products');
      res.status(200)
    })
    .catch((error)=>{
      res.status(500)
    })
  },

};

module.exports = controller;