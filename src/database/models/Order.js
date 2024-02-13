const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

module.exports = (sequelize, dataTypes) => {
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
    return Order;
}

/*
El patrón de "Factory Function" es una práctica común en aplicaciones de Node.js que utilizan Sequelize, ya que proporciona una forma más robusta de definir modelos y asegura que la instancia de Sequelize utilizada sea la misma en todo el proyecto, lo que ayuda a prevenir errores relacionados con instancias de Sequelize diferentes o mal configuradas.
*/