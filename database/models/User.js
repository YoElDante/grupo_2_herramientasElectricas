module.exports = (sequelize, dataTypes)=>{
    const alias = 'User';
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
        firtsname: { // Cristian: ATENCION - Lo correcto es "firstname" (tengo entendido).
            type: dataTypes.STRING(20)
        },
        lastname: {
            type: dataTypes.STRING(20)
        },
        birthday: {
            type: dataTypes.DATE
        },
        phone: {
            type: dataTypes.STRING(20) // Cristian: ¿VARCHAR?
        },
        street: {
            type: dataTypes.STRING(20)
        },
        city: {
            type: dataTypes.STRING(20)
        },
        country: {
            type: dataTypes.STRING(20)
        },
        zipcode: {
            type: dataTypes.STRING(10)
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'users',
        timestamps: true
    };
    const User = sequelize.define(alias, colums, config);
    // Cristian: Asociaciones.
    
    return User;
}
