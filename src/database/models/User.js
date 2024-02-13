const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const alias = 'User';
const cols = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    firtsname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    zipcode: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
};

const config = {
    tableName: 'users',
    timestamps: true
};

const User = sequelize.define(alias, cols, config);

User.associate = models => {
  User.hasOne(models.Account, {
      as: 'account',
      foreignKey: 'user_id'
  });
};

module.exports = User;