module.exports = (sequelize, dataTypes)=>{
    const alias = 'ProductImage';
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
        image: {
            type: dataTypes.STRING(255)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'productimages',
        timestamps: true
    };

    const ProductImage = sequelize.define(alias, colums, config);

    // Cristian: Asociaciones.
    ProductImage.associate = (models)=>{
        ProductImage.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
    };
    
    return ProductImage;
}
