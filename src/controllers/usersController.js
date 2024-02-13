const express = require('express');
const path = require('node:path');
const userModel = require('../database/services/userdataAccessService.js');
const bcrypt = require('bcryptjs');

//validaciones
const { validationResult } = require('express-validator');


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


  // Se crea un nuevo usuario por metodo POST
  create: (req, res) => {

    //creamos una variable con los errores recibidos
    let errors = validationResult(req);

    // preguntamos si hay errores
    if (errors.isEmpty()) {
      //si no hay errores

      //bandera TRUE
      console.log(`pase por el "if con true" ${errors.mapped()}`)

      //creamos un nuevo usuario con los datos recibidos del formulario
      let newUser = {
        id: null,

        //Datos de la Cuenta
        email: req.body.email.trim(),
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),

        //Datos personales
        firtsname: req.body.firtsname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,

        //Datos de Contacto
        phone: req.body.phone,
        address: {
          street: req.body.street,
          city: req.body.city,
          country: req.body.country,
          cp: req.body.cp
        },

        //Direccion de la imagen.
        //Si viene de req.file
        image: (req.file) ?
          //la recibe del formulario
          path.resolve(req.file.destination, req.file.filename) :
          //sino manda la img defauld
          path.resolve(__dirname, "../../public/img/users/default.jpg")

      };

      //pasamos el usuario al modelo para que lo guarde en la bd
      userModel.save(newUser);

      //redirigimos al home
      res.redirect("/");

    } else {
      //Si hay errores

      //Imprimimos por consola lo que le vamos a pasar a la vista
      console.log(`pase por el "else" ${JSON.stringify(errors.array())}`)

      // Pasamos los errores mappeados y pasamos la informacion anterior del formulario
      res.render('../views/users/register.ejs', { errors: errors.mapped(), oldData: req.body });
    }

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

