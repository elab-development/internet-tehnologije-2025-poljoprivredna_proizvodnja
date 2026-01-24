const router = require('express').Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/auth');

// Sve rute zahtevaju autentifikaciju
router.use(authMiddleware);

// GET /expenses
router.get('/', expenseController.getAll);

// POST /expenses
router.post('/', expenseController.create);

// PUT /expenses/:id
router.put('/:id', expenseController.update);

// DELETE /expenses/:id
router.delete('/:id', expenseController.remove);

module.exports = router;
