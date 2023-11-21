const express = require('express');
const path = require('node:path');


const controller = {
    
    index: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../views/login.html'));
    },

};

module.exports = controller;