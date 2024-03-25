const express = require('express'); 
const path = require('path'); 
const products = require('../database/services/productsdataAccessService.js');

const controller = {
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'), {products});
    },
    dashboard: (req, res) => {
        res.render(path.resolve(__dirname, '../views/dashboard.ejs'));
    }

};

module.exports = controller;