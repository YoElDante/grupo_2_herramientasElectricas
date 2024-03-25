const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const path = require('path');
const { Console } = require('console');


const userServices = {
  getAll: async (page = 1, pageSize = 5) => {

    try {

      const offset = (page - 1) * pageSize;

      // Usa count() para obtener el total de usuarios
      const totalAccounts = await db.Account.count();

      //Metodo que nos da Sequelize
      const allAccounts = await db.Account.findAll(
        {
          include: ['user'],
          offset: offset,
          limit: pageSize
        }
      );

      // Calculamos si hay más cuentas después de la página actual
      const totalPages = Math.ceil(totalAccounts / pageSize);
      const hasNext = page < totalPages;

      // Devuelve tanto los usuarios de la página actual como el indicador hasNext
      return { totalAccounts, totalPages, allAccounts, hasNext };


    } catch (error) {

      console.error('Error al obtener todas las cuentas:', error);
      throw new Error('No se pudieron obtener todas las cuentas');
    }

  },

  //----------------------------------
  //   Buscar cuenta por id || mail
  //----------------------------------
  findAccount: async (identifier) => {
    try {

      let accountFinded;
      let hasNext = false;
  
      if (!isNaN(identifier)) { 
        // Verificamos si el identificador es un número (id)

        accountFinded = await db.Account.findByPk(identifier, { include: ['user'] });

        // Verificar si hay registros "siguientes"
        const nextAccount = await db.Account.findOne({
          where: { id: { [Op.gt]: identifier } },
          attributes: ['id'],
          raw: true
        });

        hasNext = !!nextAccount;
      } else { 
        // Si no es un número, asumimos que es un email
        accountFinded = await db.Account.findOne({
          where: { email: identifier },
          include: ['user']
        });
      }
  
      if (!accountFinded) {
        throw new Error(`No se encontró cuenta con el identificador ${identifier}❗`);
      }
  
      return { accountFinded, hasNext };
  
    } catch (error) {
      console.error(error);
      // Aquí enviamos el error para que lo maneje el controller
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

  updateAccount: async (userid, dataUser) => {
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
        where: { id: userid },
        transaction: transaction
      });

      // Actualizamos los datos de la cuenta asociada al usuario
      const accountUpdate = await db.Account.update({
        username: dataUser.username,
        email: dataUser.email,
        password: dataUser.password,
        avatar: dataUser.avatar,
      }, {
        where: { id: userid },
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
