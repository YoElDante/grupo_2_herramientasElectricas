module.exports = (sequelize, dataTypes)=>{
    const alias = 'Order';
    const colums = { // Cristian: Columnas de la base de datos.
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        /*createAT: { // Cristian: Controlar la ultima "T", con respecto a la base de datos.
            type: dataTypes.DATE
        },
        updateAT: { // Cristian: Controlar la ultima "T", con respecto a la base de datos.
            type: dataTypes.DATE
        },*/
        account_id: {
            type: dataTypes.INTEGER(10),
            //foreignKey: true
        },
        solddate: { // Cristian: ¿Todo en minuscula?
            type: dataTypes.DATE // Cristian: ¿tipo DATE?
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'orders',
        timestamps: true
    };

    const Order = sequelize.define(alias, colums, config);

    // Cristian: Asociaciones.
    Order.associate = (models)=>{
        Order.belongsTo(models.Account, {
            as: "account",
            foreignKey: "account_id"
        })
    };
    Order.associate = (models)=>{
        Order.hasMany(models.orderdetails, { // Cristian: ¿?
            as: "orderDetails",
            foreignKey: "order_id"
        })
    };
    
    return Order;
}
