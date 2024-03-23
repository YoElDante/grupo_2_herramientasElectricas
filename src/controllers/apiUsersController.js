const express = require('express')
const userService = require('../database/services/userdataAccessService.js');

const controller = {
  list: async (req, res) => {

    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 5;

      const { totalAccounts, totalPages, allAccounts, hasNext } = await userService.getAll(page, pageSize);

      // Si la solicitud fue exitosa, establece el encabezado de la API
      res.setHeader('Content-Type', 'application/json');

      //definimos el objeto response
      const response = {};

      response.info = {
        "count": totalAccounts,
        "pages": totalPages,
        "actualPage": page,
        "next": hasNext ? `?page=${page + 1}` : "No hay página siguiente",
        "prev": page > 1 ? `?page=${page - 1}` : "No hay página anterior"
      }

      const accounts = allAccounts.map(element => ({
        id: element.id,
        username: element.username,
        email: element.email,
        details: `/api/users/${element.id}`
      }));

      response.results = accounts;

      // Envíamos la respuesta con el estado 200 y los datos paginados
      res.status(200).json(response);

    } catch (error) {
      // Si ocurre un error, maneja el error y envía una respuesta de error adecuada
      console.error('Error al obtener la lista de usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  details: async (req, res) => {

    try {

      const id = parseInt(req.params.id)

      const { accountFinded, hasNext } = await userService.findAccount(id);

      // Si la solicitud fue exitosa, establece el encabezado de la API
      res.setHeader('Content-Type', 'application/json');

      //definimos el objeto response
      const response = {};

      response.info = {
        "actual": id,
        "next": hasNext ? `/api/users/${id + 1}` : "No hay cuenta siguiente",
        "prev": id > 1 ? `/api/users/${id - 1}` : "No hay cuenta anterior",
        "list": `/api/users`
      }

      // let account = {
      //   ...accountFinded,
      let account = {
        "id": accountFinded.id,
        "username": accountFinded.username,
        "email": accountFinded.email,
        "avatar": `/img/users/${accountFinded.avatar}`,
        "firstname": accountFinded.user.firstname,
        "lastname": accountFinded.user.lastname,
        "birthday": accountFinded.user.birthday,
        "phone": accountFinded.user.phone,
        "street": accountFinded.user.street,
        "city": accountFinded.user.city,
        "country": accountFinded.user.country,
        "zipcode": accountFinded.user.zipcode,
      }
      response.results = account;


      // Envíamos la respuesta con el estado 200 y los datos paginados
      res.status(200).json(response);

    } catch (error) {
      // Si ocurre un error, maneja el error y envía una respuesta de error adecuada
      console.error('Error al obtener la lista de usuarios:', error);
      res.status(500).json({
        error: error.message,
        list: `/api/users`
      });
    }

  },
}

module.exports = controller