const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const alias = 'Order';
const cols = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    solddate: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const config = {
    tableName: 'orders',
    timestamps: true
};

const Order = sequelize.define(alias, cols, config);

Order.associate = models => {
    Order.belongsTo(models.Account, {
        as: 'account',
        foreignKey: 'account_id'
    });

    Order.hasMany(models.OrderDetail, {
        as: 'orderDetails',
        foreignKey: 'order_id'
    });
};

module.exports = Order;