const { Production } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const list = await Production.findAll({ raw: true });
    console.log('Productions from DB:', list); // <- dodaj ovo
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.create = async (req, res) => {
  const production = await Production.create(req.body);
  res.json(production);
};

exports.update = async (req, res) => {
  const p = await Production.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });

  await p.update(req.body);
  res.json(p);
};
