const { Production } = require('../models');

exports.getAllProductions = async (req, res) => {
  try {
    const productions = await Production.findAll();
    res.json(productions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductionById = async (req, res) => {
  try {
    const production = await Production.findByPk(req.params.id);
    if (!production) return res.status(404).json({ message: 'Production not found' });
    res.json(production);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduction = async (req, res) => {
  try {
    const { cropId, quantity, date } = req.body;
    const production = await Production.create({ cropId, quantity, date });
    res.json(production);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduction = async (req, res) => {
  try {
    const production = await Production.findByPk(req.params.id);
    if (!production) return res.status(404).json({ message: 'Production not found' });
    await production.update(req.body);
    res.json(production);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByPk(req.params.id);
    if (!production) return res.status(404).json({ message: 'Production not found' });
    await production.destroy();
    res.json({ message: 'Production deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
