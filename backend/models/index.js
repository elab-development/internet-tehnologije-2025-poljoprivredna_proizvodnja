const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const Role = require('./role')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Field = require('./field')(sequelize, DataTypes);
const Crop = require('./crop')(sequelize, DataTypes);
const Production = require('./production')(sequelize, DataTypes);
const Expense = require('./expense')(sequelize, DataTypes);

// Relacije
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(Field, { foreignKey: 'userId' });
Field.belongsTo(User, { foreignKey: 'userId' });

Field.hasMany(Crop, { foreignKey: 'fieldId' });
Crop.belongsTo(Field, { foreignKey: 'fieldId' });

Crop.hasMany(Production, { foreignKey: 'cropId' });
Production.belongsTo(Crop, { foreignKey: 'cropId' });

Field.hasMany(Expense, { foreignKey: 'fieldId' });
Expense.belongsTo(Field, { foreignKey: 'fieldId' });

module.exports = {
  sequelize,
  Role,
  User,
  Field,
  Crop,
  Production,
  Expense
};
