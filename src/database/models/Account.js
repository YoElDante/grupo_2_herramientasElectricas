module.exports = (sequelize, dataTypes) => {
  let alias = 'Account';
  let cols = {
    id: {
      type: dataTypes.INT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    username: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    avatar: {
      type: dataTypes.STRING(255),
      allowNull: false
    },

    user_id: {
      type: dataTypes.INT(10),
      undefined: true
    }
  };
  let config = {
    timestamps: true,
  }

  const Account = sequelize.define(alias, cols, config);

  Account.associate = function (models) {
    Account.belongsTo(models.User, {
      // models.Genre -> User es el valor de alias en User.js
      as: "user",
      foreignKey: "user_id"
    })
  }

  return Account
};