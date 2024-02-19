module.exports = (sequelize, DataTypes) => {
  const alias = 'Product';
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    productbrand_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  };

  const config = {
    tableName: 'products',
    timestamps: true
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = models => {
    Product.hasMany(models.OrderDetail, {
      as: 'orderDetails',
      foreignKey: 'product_id'
    });

    Product.belongsTo(models.ProductDetail, {
      as: 'productDetail',
      foreignKey: 'product_id'
    });

    Product.hasMany(models.ProductImage, {
      as: 'productImages',
      foreignKey: 'product_id'
    });

    Product.belongsTo(models.ProductBrand, {
      as: 'productBrand',
      foreignKey: 'productbrand_id'
    });
  };
  return Product;
}
