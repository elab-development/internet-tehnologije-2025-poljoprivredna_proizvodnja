module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define('Production', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    sowingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    seedQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    hybrid: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fertilizationType: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fertilizationQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    fertilizationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    protectionType: {
      type: DataTypes.STRING,
      allowNull: true
    },

    irrigationSystem: {
      type: DataTypes.STRING,
      allowNull: true
    },

    waterUsed: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    harvestDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    yieldKg: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'productions',
    timestamps: true
  });

  Production.associate = (models) => {
    Production.belongsTo(models.Field, { foreignKey: 'fieldId' });
  };

  return Production;
};
