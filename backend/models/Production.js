const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Crop = require("./Crop");

const Production = sequelize.define("Production", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  cropId: {
    type: DataTypes.INTEGER,
    references: { model: Crop, key: "id" }
  }
}, {
  tableName: "productions",
  timestamps: true
});

Production.belongsTo(Crop, { foreignKey: "cropId" });
Crop.hasMany(Production, { foreignKey: "cropId" });

module.exports = Production;
