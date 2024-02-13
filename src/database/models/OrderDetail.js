const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const alias = 'OrderDetail';
const cols = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
    }
};

const config = {
    tableName: 'orderdetails',
    timestamps: true
};

const OrderDetail = sequelize.define(alias, cols, config);

OrderDetail.associate = models => {
    OrderDetail.belongsTo(models.Order, {
        as: 'order',
        foreignKey: 'order_id'
    });

    OrderDetail.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
    });
};

module.exports = OrderDetail;