module.exports = (sequelize, dataTypes)=>{
    const alias = 'Product';
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
        name: {
            type: dataTypes.STRING(25)
        },
        productbrand_id: {  // Cristian: ¿Todo en minuscula?
            type: dataTypes.INTEGER(10),
            //foreingKey: true
        },
        model: {
            type: dataTypes.STRING(25)
        },
        description: {
            type: dataTypes.STRING(100)
        },
        price: {
            type: dataTypes.DECIMAL(10, 0)
        },
        units: {
            type: dataTypes.INTEGER(10)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'products',
        timestamps: true
    };
    const Product = sequelize.define(alias, colums, config);
    // Cristian: Asociaciones.
    
    return Product;
}
