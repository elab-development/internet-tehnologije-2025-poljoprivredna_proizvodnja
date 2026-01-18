const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Field = require("./Field");

const Expense = sequelize.define("Expense", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  fieldId: { type: DataTypes.INTEGER, references: { model: Field, key: "id" } }
}, {
  tableName: "expenses",
  timestamps: true
});

Expense.belongsTo(Field, { foreignKey: "fieldId" });
Field.hasMany(Expense, { foreignKey: "fieldId" });

module.exports = Expense;
