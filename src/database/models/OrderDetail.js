module.exports = (sequelize, dataTypes)=>{
    const alias = 'OrderDetail';
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
        order_id: {
            type: dataTypes.INTEGER(10),
            //foreignKey: true
        },
        product_id: {
            type: dataTypes.INTEGER(10),
            //foreignKey: true
        },
        quantity: {
            type: dataTypes.INTEGER(10)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'orderdetails',
        timestamps: true
    };

    const OrderDetail = sequelize.define(alias, colums, config);

    // Cristian: Asociaciones.
    OrderDetail.associate = (models)=>{
        OrderDetail.belongsTo(models.Order, {
            as: "order",
            foreignKey: "order_id"
        })
    };
    OrderDetail.associate = (models)=>{
        OrderDetail.belongsTo(models.Product, { // Cristian: ¿?
            as: "product",
            foreignKey: "product_id"
        })
    };
    
    return OrderDetail;
}
