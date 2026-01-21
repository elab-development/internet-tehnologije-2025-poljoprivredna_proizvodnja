const express = require('express');
const router = express.Router();
const {
  getAllNotifications,
  markAsRead,
  generateNotifications,
  deleteAllNotifications
} = require('../controllers/notificationController');

router.get('/', getAllNotifications);          // Dohvati sve
router.post('/generate', generateNotifications); // Generiši nove iz Production
router.put('/:id/read', markAsRead);          // Označi kao pročitano
router.delete('/', deleteAllNotifications);   // Obrisati sve

module.exports = router;
