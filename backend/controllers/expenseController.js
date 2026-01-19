const { Expense } = require('../models');

exports.getAll = async (req, res) => {
  const list = await Expense.findAll();
  res.json(list);
};

exports.create = async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json(expense);
};
