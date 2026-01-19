module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    soilType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING, // npr "45.123,19.456"
      allowNull: true
    },
    season: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Field.associate = (models) => {
    Field.hasMany(models.Production, { foreignKey: 'fieldId' });
  };

  return Field;
};
