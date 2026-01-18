module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    productionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'expenses',
    timestamps: true,
  });

  return Expense;
};
