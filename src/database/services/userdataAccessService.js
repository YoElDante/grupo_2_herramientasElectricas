const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const path = require('path');
const { Console } = require('console');


const userServices = {
  getAll: async () => {

    let allAccounts = await db.Account.findAll({
      include: ['user']
    })

    return allAccounts

  },

  //----------------------
  //   Buscar cuenta
  //----------------------

  findAccount: async (identifier) => {

    try {

      let accountFinded;

      if (identifier.includes('@')) {
        accountFinded = await db.Account.findOne({
          where: { email: identifier },
          include: ['user']
        });
      } else {
        accountFinded = await db.Account.findByPk(identifier, { include: ['user'] });
      }

      if (!accountFinded) {
        throw new Error(`No se encontró cuenta con email ${identifier} ❗`);
      }

      return accountFinded;

    } catch (error) {

      console.error(error);
      //aqui enviamos el error para que lo maneje el controller
      throw error;
    }
  },

  //--------------------------
  //   Crear Usuario nuevo
  //--------------------------
  create: async (newUser) => {

    // Iniciamos una transacción para acumular las operaciones
    let transaction;

    try {
      transaction = await db.sequelize.transaction();

      // Creamos el registro de un usuario
      const user = await db.User.create(
        {
          firstname: newUser.firstname,
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
          username: newUser.username,
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
  },

  //--------------------------
  // Actualizar datos usuario
  //--------------------------

  updateAccount: async (dataUser) => {
    // Iniciamos una transacción para acumular las operaciones
    let transaction;

    try {
      transaction = await db.sequelize.transaction();

      // Actualizamos los datos del usuario
      const userUpdate = await db.User.update({
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        birthday: dataUser.birthday,
        phone: dataUser.phone,
        street: dataUser.street,
        city: dataUser.city,
        country: dataUser.country,
        zipcode: dataUser.zipcode,
      }, {
        where: { id: dataUser.id },
        transaction: transaction
      });

      // Actualizamos los datos de la cuenta asociada al usuario
      const accountUpdate = await db.Account.update({
        username: dataUser.username,
        email: dataUser.email,
        password: dataUser.password,
        avatar: dataUser.avatar,
      }, {
        where: { id: dataUser.id },
        transaction: transaction
      });

      // Comprometemos/Commit de la transacción si todo fue exitoso
      await transaction.commit();

      // Retornamos true para indicar que el usuario fue creado exitosamente
      return true;
    } catch (error) {

      // Deshacemos/Rollback la transacción si hubo algún error
      // mantiene la integridad de los datos ya que el registro de la cuenta debe ir a la par del de usuario
      if (transaction) await transaction.rollback();

      // Lanzamos el error nuevamente para que sea manejado por el controlador
      console.error('Error al actualizar los datos del usuario:', error);
      throw error;
    }
  },

  deleteAccount: async (id) => {
    try {
      await db.Account.destroy({
        where: {
          id: id
        }
      });
      console.log(`Cuenta ${id} eliminada exitosamente`);

    } catch (error) {

      console.error('Error al eliminar el registro:', error);
    }

  }

}

module.exports = userServices;
