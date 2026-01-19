const { Field } = require('../models');

exports.getAll = async (req, res) => {
  const fields = await Field.findAll();
  res.json(fields);
};

exports.create = async (req, res) => {
  const { name, area, soilType, location, season } = req.body;
  const field = await Field.create({ name, area, soilType, location, season });
  res.json(field);
};

exports.update = async (req, res) => {
  const field = await Field.findByPk(req.params.id);
  if (!field) return res.status(404).json({ message: 'Not found' });

  await field.update(req.body);
  res.json(field);
};

exports.remove = async (req, res) => {
  const field = await Field.findByPk(req.params.id);
  if (!field) return res.status(404).json({ message: 'Not found' });

  await field.destroy();
  res.json({ message: 'Deleted' });
};
