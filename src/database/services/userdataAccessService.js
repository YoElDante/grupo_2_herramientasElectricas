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

    // Iniciamos una transacción para acumular las operaciones
    let transaction;
    try {
      transaction = await db.sequelize.transaction();

      // Creamos el registro de un usuario
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
        },
        { transaction }
      );

      // Creamos el registro de la cuenta asociada al usuario
      const account = await db.Account.create(
        {
          userName: newUser.userName,
          email: newUser.email,
          password: newUser.password,
          avatar: newUser.avatar,
          user_id: user.id
        },
        { transaction }
      );

      // Comprometemos/Commit de la transacción si todo fue exitoso
      await transaction.commit();

      // Retornamos true para indicar que el usuario fue creado exitosamente
      return true;
    } catch (error) {

      // Deshacemos/Rollback la transacción si hubo algún error
      // mantiene la integridad de los datos ya que el registro de la cuenta debe ir a la par del de usuario
      if (transaction) await transaction.rollback();

      // Lanzamos el error nuevamente para que sea manejado por el controlador
      console.error('Error al crear nuevo usuario:', error);
      throw error;
    }
  }
}

module.exports = userServices;
