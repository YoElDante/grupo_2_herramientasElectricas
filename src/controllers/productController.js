const express = require('express'); // Cristian
const path = require('path'); // Cristian

const controller = { // Cristian
    create: (req, res)=>{
        res.render(path.resolve(__dirname,'../views/products/productCreate.ejs'))
    },
    createOk: (req, res)=>{
        res.send("Todo marcha bien Milhouse");
    },
    edit: (req, res)=>{
        res.render(path.resolve(__dirname,'../views/products/productEdit.ejs'))
    },
    editOk: (req, res)=>{
        // codigo
    }
};

module.exports = controller; // Cristian