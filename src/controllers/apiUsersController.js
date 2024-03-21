const express = require ('express')
const userService = require ('../database/services/userdataAccessService.js');

const controller = {
    list: async (req , res) => {
        let listUsers = await userService.getAll();

        res.status(200).json(listUsers)
    },
    details: (req , res) => {
        res.send('muestro la lista de users')
    },
}

module.exports = controller