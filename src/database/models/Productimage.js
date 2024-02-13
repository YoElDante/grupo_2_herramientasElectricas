const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

module.exports = (sequelize, dataTypes) => {
const alias = 'ProductImage';
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
    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
};

const config = {
    tableName: 'productimages',
    timestamps: true
};

const ProductImage = sequelize.define(alias, cols, config);

ProductImage.associate = models => {
    ProductImage.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
    });
};

return ProductImage;
}