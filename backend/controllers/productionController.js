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
  try {
    // req.user.id dolazi iz JWT middleware-a
    if ([3, 5].includes(req.user.roleId)) {
      return res.status(403).json({ message: 'You are not allowed to create a production' });
    }

    const production = await Production.create(req.body);
    res.json(production);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    // Provera da li je korisnik zabranjen
    if ([3, 5].includes(req.user.roleId)) {
      return res.status(403).json({ message: 'You are not allowed to update a production' });
    }

    const production = await Production.findByPk(req.params.id);
    if (!production) return res.status(404).json({ message: 'Production not found' });

    await production.update(req.body);
    res.json(production);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

