const { Expense } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const list = await Expense.findAll({ raw: true });
    console.log('Expenses from DB:', list);
    res.json(list);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log('Creating expense with body:', req.body);

    const expense = await Expense.create({
      fieldId: req.body.fieldId ?? null,
      productionId: req.body.productionId ?? null,
      type: req.body.type ?? null,
      description: req.body.description ?? '',
      amount: req.body.amount ?? 0,
      date: req.body.date ? new Date(req.body.date) : null
    });

    console.log('Created expense:', expense.toJSON());
    res.json(expense);
  } catch (err) {
    console.error('Error creating expense:', err);
    res.status(500).json({ message: err.message });
  }
};
