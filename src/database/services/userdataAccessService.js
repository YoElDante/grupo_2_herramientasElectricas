const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const path = require('path');

//Cargar el array con la base de Datos
const usersFilePath = path.join(__dirname, '../users.json');
let usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
const users = JSON.parse(usersJSON);


const userServices = {
    getAll: () => {
        Users.findAll({
            include: ['account']
        })
            .then(users => {
                return users
            })
    },

    getOne: (id) => {
        Users.findByPk(id,
            {
                include: ['account']
            })
            .then(user => {
                return user;
            });
    },

    create: async (newUser) => {
        //Genera Un nuevo Usuario con su Correspondiente Cuenta
        // Intentamos escribir en la base de datos
        try {
            // generamos el registro en la tabla de Accounts
            // generamos el registro en la tabla de Users
            const user = await db.User.create(
                {
                    firtsname: newUser.firtsname,
                    lastname: newUser.lastname,
                    birthday: newUser.birthday,
                    phone: newUser.phone,
                    street: newUser.street,
                    city: newUser.city,
                    country: newUser.country,
                    zipcode: newUser.zipcode,
                }
                )
            const account = await db.Account.create (
                    {
                        userName: newUser.userName,
                        email: newUser.email,
                        password: newUser.password,
                        avatar: newUser.avatar,
                        user_id: user.id
                    }
                )
            return true;
        // Si falla lanzamos un error
        } catch (error) {
            console.error(error);
            return false
        }
        
    }
}

module.exports = userServices;