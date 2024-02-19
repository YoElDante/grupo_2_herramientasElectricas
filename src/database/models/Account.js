module.exports = (sequelize, DataTypes) => {

  const alias = 'Account';
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  };

  const config = {
    tableName: 'accounts',
    timestamps: true
  };

  const Account = sequelize.define(alias, cols, config);

  Account.associate = models => {
    Account.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        onDelete: 'CASCADE' // Eliminación en cascada
      }
    });
  };

  return Account;

}
