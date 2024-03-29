module.exports = (sequelize, DataTypes) => {
  const alias = 'ProductBrand';
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  };

  const config = {
    tableName: 'productbrands',
    timestamps: false
  };

  const ProductBrand = sequelize.define(alias, cols, config);

  ProductBrand.associate = models => {
    ProductBrand.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productbrand_id'
    });
  };
  return ProductBrand;
}