const express = require('express');
const path = require('node:path');


const controller = {

    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },
    create: (req, res) => {
        res.send(`Controller funcionando, falta enviar info al JSON`)
        console.log(req.body);
        // let usuario = {
        //     nombreYApellido: req.body.nombreYApellido,
        //     correoElectronico: req.body.correoElectronico,
        //     telefono: req.body.telefono,
        //     contrasenia: req.body.contrasenia,
        //     contrasenia2: req.body.contrasenia2
        // };
        // res.redirect("/");
    }
};

module.exports = controller;