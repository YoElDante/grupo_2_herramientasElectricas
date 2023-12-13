const express = require('express');
const path = require('node:path');
const fs = require("fs");


const controller = {

    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },
    create: (req, res) => {
        let usuario = {
            nombreYApellido: req.body.nombreYApellido,
            correoElectronico: req.body.correoElectronico,
            telefono: req.body.telefono,
            contrasenia: req.body.contrasenia,
            contrasenia2: req.body.contrasenia2
        };
        let archivoUser = fs.readFileSync("src/database/user.json", { encoding: "utf-8" })
        let usuarios;
        if (archivoUser == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUser);
        };

        usuarios.push(usuario);

        usuariosJSON = JSON.stringify(usuarios);
        fs.writeFileSync("src/database/user.json", usuariosJSON);
        res.redirect("/");
    }
};

module.exports = controller;