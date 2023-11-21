const express = require('express');
const path = require('node:path');


const controller = {
    
    index: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/home.html'));
    },

};

module.exports = controller;