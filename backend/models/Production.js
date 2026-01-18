module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define('Production', {
    cropId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    harvestDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'productions',
    timestamps: true,
  });

  return Production;
};
