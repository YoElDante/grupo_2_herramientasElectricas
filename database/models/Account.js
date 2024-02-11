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
            //foreignKey: true
        }
    };
    const config = { // Cristian: Configuraciones opcionales.
        tableName: 'accounts',
        timestamps: true
    };

    const Account = sequelize.define(alias, colums, config);
    
    // Cristian: Asociaciones.
    Account.associate = (models)=>{
        Account.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
    };
    Account.associate = (models)=>{
        Account.hasMany(models.Order, {
            as: "orders",
            foreignKey: "account_id"
        })
    };
    
    return Account;
}
