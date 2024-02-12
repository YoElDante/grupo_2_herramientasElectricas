module.exports = (sequelize, dataTypes)=>{
    const alias = 'ProductDetail';
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
        product_id: {
            type: dataTypes.INTEGER(10),
            //foreignKey: true
        },
        voltage: {
            type: dataTypes.STRING(10)
        },
        frequency: {
            type: dataTypes.STRING(10)
        },
        power: {
            type: dataTypes.STRING(10)
        },
        extras: {
            type: dataTypes.TEXT
        },
        manual: {
            type: dataTypes.STRING(255)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'productdetails',
        timestamps: true
    };

    const ProductDetail = sequelize.define(alias, colums, config);

    // Cristian: Asociaciones.
    ProductDetail.associate = (models)=>{
        ProductDetail.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
    };
    
    return ProductDetail;
}
