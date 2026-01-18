const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const auth = require('../middleware/auth');

router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getFieldById);
router.post('/', auth, fieldController.createField);
router.put('/:id', auth, fieldController.updateField);
router.delete('/:id', auth, fieldController.deleteField);

module.exports = router;
