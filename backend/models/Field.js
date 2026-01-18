const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Field = sequelize.define("Field", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.FLOAT, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" }
  }
}, {
  tableName: "fields",
  timestamps: true
});

Field.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Field, { foreignKey: "userId" });

module.exports = Field;
