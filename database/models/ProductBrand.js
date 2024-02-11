module.exports = (sequelize, dataTypes)=>{
    const alias = 'ProductBrand';
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
            type: dataTypes.STRING(20)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'productbrands',
        timestamps: true
    };
    const ProductBrand = sequelize.define(alias, colums, config);
    // Cristian: Asociaciones.
    
    return ProductBrand;
}
