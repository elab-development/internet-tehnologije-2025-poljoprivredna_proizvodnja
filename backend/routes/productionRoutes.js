const router = require('express').Router();
const c = require('../controllers/productionController');

router.get('/', c.getAll);
router.post('/', c.create);
router.put('/:id', c.update);

module.exports = router;
