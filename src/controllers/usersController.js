const express = require('express');
const path = require('node:path');
const bcrypt = require('bcryptjs');

//validaciones
const { validationResult } = require('express-validator');

// Solicitamos el Servicio
const userService = require('../database/services/userdataAccessService.js');

const controller = {

  // *****************
  //      Login
  // *****************

  //GET
  login: (req, res) => {
    res.render(path.resolve(__dirname, '../views/users/login.ejs'));
  },

  //POST
  loginConfirm: async (req, res) => {
    try {

      //Recibimos los datos del form con req.body
      let { email, password, rememberMe } = req.body

      //Pedimos al servicio la cuenta
      const accountSearched = await userService.findAccount(email);

      // comparamos la contraseña de la cuenta con la que ingreso el cliente por el formulario
      if (bcrypt.compareSync(password, accountSearched.password)) {
        // Coinciden?
        // si) ingresa la cuenta
        console.log(`usuario ${accountSearched.username} autorizado`);
        // confirmamos el ingreso del usuario con req.session.logined
        req.session.logined = true;

        // guardamos el username del usuario en req.session.username
        // pasamos el username para que lo saluden en el header personalizadamente
        req.session.userid = accountSearched.id;
        req.session.username = accountSearched.username;

        // Verificamos checkbox de recuérdame
        if (rememberMe) {
          // Generamos cookie con tiempo de expiración
          res.cookie('rememberMe', 'true', { maxAge: 600000 }); // Expira en 10 min, para una semana 604800000
        } else {
          // Eliminamos la cookie si no seleccionó recordar
          res.clearCookie('rememberMe');
        }

        // redirigimos a la ruta '/'
        res.redirect('/');

      } else {
        // la contraseña no coincide
        // lanzamos un error de que la contraseña no coincide
        throw new Error('Contraseña incorrecta ❗');
      }

    } catch (error) {
      // no encuentra) 
      // informamos que el usuario no se ha encontrado
      // enviamos el valor del campo account para llenar el campo del usuario
      res.render(path.resolve(__dirname, '../views/users/login.ejs'), { error: error.message })

    }
  },

  // *****************
  //     Register
  // *****************

  //GET
  register: (req, res) => {
    res.render(path.resolve(__dirname, '../views/users/register.ejs'));
  },

  //POST
  createNewUser: async (req, res) => {

    //creamos una variable con los errores recibidos
    let errors = validationResult(req);

    try {

      //creamos un nuevo usuario con los datos recibidos del formulario
      let newUser = {

        //Datos de la Cuenta
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim(),
        password: bcrypt.hashSync(req.body.password, 10),

        //Datos personales
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        birthday: req.body.birthday.trim(),

        //Datos de Contacto
        phone: req.body.phone.trim(),
        street: req.body.street.trim(),
        city: req.body.city.trim(),
        country: req.body.country.trim(),
        zipcode: req.body.zipcode.trim(),

        //Direccion de la imagen.
        //Si viene de req.file
        avatar: (req.file) ?
          //la recibe del formulario
          path.resolve("./img/users/", req.file.filename) :
          //sino manda la img defauld
          "./img/users/default.jpg"

      };

      console.log(`asi quedo el nuevo usuario creado: ${newUser}`);
      //pasamos el usuario al modelo para que lo guarde en la bd

      await userService.create(newUser);

      //redirigimos al login
      res.redirect("/users/login");

    } catch (error) {

      // Manejo de errores
      console.error("Error al procesar la solicitud:", error);

      let errors = validationResult(req)

      //Imprimimos por consola lo que le vamos a pasar a la vista
      console.log(`Lista de errores: ${JSON.stringify(errors.array())}`)

      // Pasamos los errores mappeados y pasamos la informacion anterior del formulario
      res.render('../views/users/register.ejs', { errors: errors.mapped(), oldData: req.body });

    }
  },

  // *****************
  //      Editar
  // *****************

  //GET
  editionForm: async (req, res) => {

    let accountFinded = await userService.findAccount(req.params.id)
    console.log(accountFinded.username);
    console.log(accountFinded.user.firstname);

    res.render(path.resolve(__dirname, '../views/users/profile.ejs'), { account: accountFinded });


  },

  //PUT
  editionConfirm: async (req, res) => {

    let errors = validationResult(req);

    try {

      //Recolectamos los datos del usuario recibidos del formulario
      let dataUser = {

        //Datos de la Cuenta
        email: req.body.email.trim().toLowerCase(),
        username: req.body.username.trim(),
        password: bcrypt.hashSync(req.body.password, 10),

        //Datos personales
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        birthday: req.body.birthday.trim(),

        //Datos de Contacto
        phone: req.body.phone.trim(),
        street: req.body.street.trim(),
        city: req.body.city.trim(),
        country: req.body.country.trim(),
        zipcode: req.body.zipcode.trim(),

        //Direccion de la imagen.
        //Si viene de req.file
        avatar: (req.file) ?
          //la recibe del formulario
          path.resolve("./img/users/", req.file.filename) :
          //sino manda la img defauld
          "./img/users/default.jpg"

      };

      console.log(`asi quedo el nuevo usuario creado: ${dataUser}`);
      //pasamos el usuario al modelo para que lo guarde en la bd

      await userService.updateAccount(dataUser);

      //redirigimos al login
      res.redirect("/");

    } catch (error) {

      // Manejo de errores
      console.error("Error al procesar la solicitud:", error);

      let errors = validationResult(req)

      //Imprimimos por consola lo que le vamos a pasar a la vista
      console.log(`Lista de errores: ${JSON.stringify(errors.array())}`)

      // Pasamos los errores mappeados y pasamos la informacion anterior del formulario
      res.render('../views/users/register.ejs', { errors: errors.mapped(), oldData: req.body });

    }

  },


  // *****************
  //      Borrar
  // *****************

  //DELETE
  delete: async (req, res) => {

    await userService.deleteAccount(req.params.id);

    this.logout(req,res);
  },

  // *****************
  //      Logout
  // *****************

  //GET
  logout: (req, res) => {
    req.session.logined = false;
    req.session.userid = '';
    req.session.username = '';
    res.clearCookie('rememberMe');

    res.redirect('/')
  }

};

module.exports = controller;

