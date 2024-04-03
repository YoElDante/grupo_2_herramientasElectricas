const db = require('../database/models');
const { Op } = require("sequelize");

const apiProductsController = {

  products: async (req, res) => {

    const resBrands = await db.ProductBrand.findAll();
    const brands = resBrands.map(brand => brand.name);
    console.log(brands);

    db.Product.findAll({
      include: [
        { association: "productBrand" },
        { association: "productImages" }
      ]
    })
      .then((products) => {
        res.status(200).json({
          info: {
            count: products.length,
            brands: brands
          },
          // Cristian: Los productos no tienen categorias.

          results: products.map((product) => ({
            id: product.id,
            name: product.name,
            brand: product.productBrand.name, // Dante: Perdon, me hacia falta para el REACT
            description: product.description,
            images: product.productImages.map((image) => ('/img/products/' + image.image)), // Cristian: Relacion 1:M
            detail: "/api/products/" + product.id
          }))
        })
      })
      .catch((error) => {
        res.status(500)
      })
  },

  detail: async (req, res) => {

    const id = parseInt(req.params.id);
    let hasNext = false;

    // Verificar si hay registros "siguientes"
    const nextProduct = await db.Product.findOne({
      where: { id: { [Op.gt]: id } },
      attributes: ['id'],
      raw: true
    });

    hasNext = !!nextProduct;

    db.Product.findByPk(id, {
      include: [
        { association: "productBrand" },
        { association: "productImages" },
        { association: "productDetail" }
      ]
    })
      .then((product) => {
        if (product) {
          res.status(200).json(
            {
              info: {

                "actual": id,
                "next": hasNext ? `/api/products/${id + 1}` : "No hay cuenta siguiente",
                "prev": id > 1 ? `/api/products/${id - 1}` : "No hay cuenta anterior",
                "list": `/api/products`

              },
              results: {
                id: product.id,
                name: product.name,
                model: product.model,
                description: product.description,
                price: product.price,
                units: product.units,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                brand: product.productBrand.name,
                images: product.productImages.map((image) => ('/img/products/' + image.image)), // Cristian: Relacion 1:M
                voltage: product.productDetail.voltage,
                frequency: product.productDetail.frequency,
                power: product.productDetail.power,
                extras: product.productDetail.extras,
                manual: product.productDetail.manual,
              }
            })
        }
      })

      .catch((error) => {
        // Si ocurre un error, maneja el error y envía una respuesta de error adecuada
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      })
  }
};

module.exports = apiProductsController;