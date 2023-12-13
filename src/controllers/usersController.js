const express = require('express');
const path = require('node:path');
const fs = require("fs");


const controller = {

    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },

    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },

    // Se crea un nuevo usuario por metodo PORT
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
    },

    // pedido GET del formulario de edicion de usuario
    editionForm: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/edicionRegistro.ejs'));
    },

    // se actualizan los datos del usuario por PUT
    editionStore: (req, res) => {
        res.send("se actualizan los datos del usuario " + req.params.id)
    },

    // se borrara un usuario de la lista por metodo DELETE
    delete: (req, res) => {
        res.send("se borraran los datos del usuario " + req.params.id)
    }

};

module.exports = controller;

