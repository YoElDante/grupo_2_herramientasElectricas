const express = require('express');
const path = require('node:path');


const controller = {
    
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'));
    },

};

module.exports = controller;