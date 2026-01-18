module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'fields',
    timestamps: true,
  });

  return Field;
};
