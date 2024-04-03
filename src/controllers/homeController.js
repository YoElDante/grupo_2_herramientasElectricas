const express = require('express'); 
const path = require('path'); 
const products = require('../database/services/productsdataAccessService.js');
const db = require('../database/models');

const controller = {
    index: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "productBrand"},
                {association: "productImages"}
            ]
        })
        .then((products)=>{
            res.render(path.resolve(__dirname, '../views/home.ejs'),
                {
                    // Cristian: Se que no es lo optimo, es una salida improvisada
                    novedad1: products[products.length - 1],
                    novedad2: products[products.length - 2],
                    // Aqui lo ideal, es agregar el campo "discount" a la base de datos. Y con ello trabajar, para mostrar los productos con descuento.
                    oferta1: products[0],
                    oferta2: products[1]
                }
            );
        })
    },
    /* Viejo index
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'), {products});
    }, */
    dashboard: (req, res) => {
        res.render(path.resolve(__dirname, '../views/dashboard.ejs'));
    }

};

module.exports = controller;