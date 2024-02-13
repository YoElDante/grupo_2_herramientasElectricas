const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const alias = 'ProductDetail';
const cols = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    voltage: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    frequency: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    power: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    extras: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    manual: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
};

const config = {
    tableName: 'productdetails',
    timestamps: true
};

const ProductDetail = sequelize.define(alias, cols, config);

ProductDetail.associate = models => {
    ProductDetail.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
    });
};

module.exports = ProductDetail;
