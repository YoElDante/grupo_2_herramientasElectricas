// Cristian
const express = require('express');
const path = require('path');

const controller = {
    create: (req,res)=>{
        res.render(path.resolve(__dirname,'../views/products/productCreate.ejs'))
    },
    edit: (req,res)=>{
        res.render(path.resolve(__dirname,'../views/products/productEdit.ejs'))
    },
};

module.exports = controller;