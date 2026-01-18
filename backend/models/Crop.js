const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Field = require("./Field");

const Crop = sequelize.define("Crop", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  season: { type: DataTypes.STRING, allowNull: false },
  fieldId: {
    type: DataTypes.INTEGER,
    references: { model: Field, key: "id" }
  }
}, {
  tableName: "crops",
  timestamps: true
});

Crop.belongsTo(Field, { foreignKey: "fieldId" });
Field.hasMany(Crop, { foreignKey: "fieldId" });

module.exports = Crop;
