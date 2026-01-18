const { Field } = require('../models');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.findAll();
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ message: 'Field not found' });
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const { name, location, size, userId } = req.body;
    const field = await Field.create({ name, location, size, userId });
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ message: 'Field not found' });
    await field.update(req.body);
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ message: 'Field not found' });
    await field.destroy();
    res.json({ message: 'Field deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
