const db = require('../database/models');

const apiProductsController = {

  products:(req, res) => {
    db.Product.findAll({
      include: [
        {association: "productBrand"},
        {association: "productImages"}
      ]
    })
    .then((products)=>{
      res.status(200).json({
        count: products.length,
        countByCategory: { // Cristian: Los productos no tienen categorias.
          categoryA: null,
          categoryB: null
        },
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          brand:product.productBrand.name, // Dante: Perdon, me hacia falta para el REACT
          description: product.description,
          images: product.productImages.map((image)=>('/img/products/'+image.image)), // Cristian: Relacion 1:M
          detail: "/api/products/" + product.id
        }))
      })
    })
    .catch((error)=>{
      res.status(500)
    })
  },
  
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        {association: "productBrand"},
        {association: "productImages"},
        {association: "productDetail"}
      ]
    })
    .then((product)=>{
      if(product){
        res.status(200).json({
          id: product.id,
          name: product.name,
          model: product.model,
          description: product.description,
          price: product.price,
          units: product.units,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          brand: product.productBrand.name,
          images: product.productImages.map((image)=>('/img/products/'+image.image)), // Cristian: Relacion 1:M
          voltage: product.productDetail.voltage,
          frequency: product.productDetail.frequency,
          power: product.productDetail.power,
          extras: product.productDetail.extras,
          manual: product.productDetail.manual,
          imagesURL: null // Cristian: ¿Como chingados hago esto?
        })
      }else{
        res.status(404).json({ // Cristian: ¿Esto esta bien? ¿Es necesario? ¿Sirve?
          id: 'undefined',
          name: 'undefined',
          model: 'undefined',
          description: 'undefined',
          price: 'undefined',
          units: 'undefined',
          createdAt: 'undefined',
          updatedAt: 'undefined',
          brand: 'undefined',
          images: 'undefined',
          voltage: 'undefined',
          frequency: 'undefined',
          power: 'undefined',
          extras: 'undefined',
          manual: 'undefined',
          imagesURL: 'undefined'
        })
      }
    })
    .catch((error)=>{
      res.status(500)
    })
  },

};

module.exports = apiProductsController;