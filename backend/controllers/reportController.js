const { Production, Expense } = require('../models');
const { Op } = require('sequelize');

exports.getReport = async (req, res) => {
  try {
    const { year, fieldId } = req.query;

    const productionFilter = {};
    if (year) productionFilter.sowingDate = { [Op.between]: [`${year}-01-01`, `${year}-12-31`] };
    if (fieldId) productionFilter.fieldId = fieldId;

    const productions = await Production.findAll({ where: productionFilter });
    const expenses = await Expense.findAll({ where: fieldId ? { fieldId } : {} });

    // Sume
    const totalSeed = productions.reduce((sum, p) => sum + (p.seedQuantity || 0), 0);
    const totalYield = productions.reduce((sum, p) => sum + (p.yieldKg || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    res.json({ productions, expenses, totals: { totalSeed, totalYield, totalExpenses } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
