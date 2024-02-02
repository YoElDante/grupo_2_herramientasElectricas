const express = require('express');
const path = require('node:path');
const userModel = require('../models/Users');
const bcrypt = require('bcryptjs');



const controller = {

    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login.ejs'));
    },

    loginOk: (req, res) => {
        console.log(req.body);
        req.session.logined = true;
        res.redirect('/');
    },

    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/register.ejs'));
    },

    // Se crea un nuevo usuario por metodo PORT
    create: (req, res) => {

        let newUser = {
            id: null,
            admin: false,/*prueba*/

            //Datos de la Cuenta
            email: req.body.email.trim(),
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),

            //Datos personales
            firtsname: req.body.firtsname,
            lastname: req.body.lastname,
            age: req.body.age,

            //Datos de Contacto
            phone: req.body.phone,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                cp: req.body.cp
            },

            //Direccion de la imagen.
            image: path.resolve(req.file.destination, req.file.filename),
        };

        userModel.save(newUser);

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

