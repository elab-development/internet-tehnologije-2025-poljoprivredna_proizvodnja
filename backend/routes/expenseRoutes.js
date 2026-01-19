const router = require('express').Router();
const c = require('../controllers/expenseController');

router.get('/', c.getAll);
router.post('/', c.create);

module.exports = router;
