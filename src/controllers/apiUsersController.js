const express = require('express')
const userService = require('../database/services/userdataAccessService.js');

const controller = {
    list: async (req, res) => {

        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;

            let usersList = await userService.getAll(page,pageSize);
            
            // Si la solicitud fue exitosa, establece el encabezado de la API
            res.setHeader('Content-Type', 'application/json');


            //definimos el objeto response
            const response = {};

            response.info = {
                "count": usersList.length,
                "pages": page,
                "next": usersList.length > 5 ? `?page=${page + 1}` : null,
                "prev": page > 1 ? `?page=${page -1}` : null
            }
            response.results = usersList;

            // Envíamos la respuesta con el estado 200 y los datos paginados
            res.status(200).json(response);

        } catch (error) {
            // Si ocurre un error, maneja el error y envía una respuesta de error adecuada
            console.error('Error al obtener la lista de usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    details: (req, res) => {
        res.send('muestro la lista de users')
    },
}

module.exports = controller