const express = require('express'); 
const path = require('path'); 
const products = require('../models/JSONtoArray');

const controller = {
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'), {products});
    }
};

module.exports = controller;