module.exports = (sequelize, dataTypes)=>{
    const alias = 'Account';
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
        username: { // Cristian: ¿Todo en minuscula?
            type: dataTypes.STRING(25)
        },
        email: {
            type: dataTypes.STRING(50)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        avatar: {
            type: dataTypes.STRING(255)
        },
        user_id: {
            type: dataTypes.INTEGER(10),
            //foreingKey: true
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'accounts',
        timestamps: true
    };
    const Account = sequelize.define(alias, colums, config);
    // Cristian: Asociaciones.
    
    return Account;
}
