const express = require('express');
const path = require('node:path');


const controller = {
    
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/edicionRegistro.ejs'));
    },

};

module.exports = controller;