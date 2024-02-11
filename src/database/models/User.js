module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: dataTypes.INT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    firtsname: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    lastname: {
      type: dataTypes.STRING(20),
      allowNull: false
    },

    birthday: {
      type: dataTypes.DATE(),
      allowNull: false
    },
    phone: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    street: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    city: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    country: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    zipcode: {
      type: dataTypes.STRING(10),
      allowNull: false
    },


  };
  let config = {
    timestamps: true,
  }

  const Account = sequelize.define(alias, cols, config);

  Account.associate = function (models) {
    Account.belongsTo(models.Account, {
      // models.Account -> User es el valor de alias en Account.js
      as: "account",
      foreignKey: "user_id"
    })

  }

  return Account
};