const router = require('express').Router();
const productionController = require('../controllers/productionController');
const authMiddleware = require('../middleware/auth'); // tvoj JWT middleware

// GET sve produkcije - javna ruta
router.get('/', productionController.getAll);

// POST kreiranje produkcije - zahteva autentifikaciju
router.post('/', authMiddleware, productionController.create);

// PUT update produkcije - zahteva autentifikaciju
router.put('/:id', authMiddleware, productionController.update);

module.exports = router;
