const express = require('express');
const router = express.Router();
const controller = require('../controllers/fieldController');
const authMiddleware = require('../middleware/auth'); // tvoj JWT middleware

// Svi zahtevi prolaze kroz JWT autentifikaciju
router.use(authMiddleware);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
