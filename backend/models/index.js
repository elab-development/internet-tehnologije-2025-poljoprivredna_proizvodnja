const sequelize = require("../config/database");

const Role = require("./Role");
const User = require("./User");
const Field = require("./Field");
const Crop = require("./Crop");
const Production = require("./Production");
const Expense = require("./Expense");

// export everything
module.exports = { sequelize, Role, User, Field, Crop, Production, Expense };
