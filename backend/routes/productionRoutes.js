const express = require('express');
const router = express.Router();
const productionController = require('../controllers/productionController');
const auth = require('../middleware/auth');

router.get('/', productionController.getAllProductions);
router.get('/:id', productionController.getProductionById);
router.post('/', auth, productionController.createProduction);
router.put('/:id', auth, productionController.updateProduction);
router.delete('/:id', auth, productionController.deleteProduction);

module.exports = router;
