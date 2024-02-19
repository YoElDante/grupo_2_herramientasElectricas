const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const path = require('path');


const userServices = {
  getAll: async () => {

    let allAccounts = await db.Account.findAll({
      include: ['user']
    })

    return allAccounts

  },

  findAccount: async (identifier) => {

    try {

      let accountFinded = await db.Account.findOne({
        where: { email: identifier }
      });

      if (!accountFinded) {
        throw new Error('No se encontró ninguna cuenta con el email proporcionado');
      }

      return accountFinded;

    } catch (error) {
      console.error('Error al buscar la cuenta:', error);
      throw error;
    }
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
      const account = await db.Account.create(
        {
          userName: newUser.userName,
          email: newUser.email,
          password: newUser.password,
          avatar: newUser.avatar,
          user_id: user.id
        }
      )
      return true;

    } catch (error) {
      // Si falla lanzamos un error
      console.error(error);
      return false
    }

  }
}

module.exports = userServices;
