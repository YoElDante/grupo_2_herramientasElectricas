const express = require('express');
const path = require('node:path');
const users = require('../models/Users');
const bcrypt = require('bcryptjs');



const controller = {

    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },

    loginOk: (req, res) => {
        req.session.logined = true;
        res.redirect('/')
    },

    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },

    // Se crea un nuevo usuario por metodo PORT
    create: (req, res) => {
        let user = {
            id: null,
            admin: false,/*prueba*/
            email: req.body.email,
            username: req.body.userName,
            password: bcrypt.hashSync(req.body.password, 10),
            confirmpassword: bcrypt.hashSync(req.body.confirmpassword, 10),
            firtsname: req.body.firtsname,
            lastname: req.body.lastname,
            age: req.body.age,
            phone: req.body.phone,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                cp: req.body.cp
            },
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

