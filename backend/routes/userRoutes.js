const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', auth, userController.register);

router.post('/login', userController.login);

// primer rute za zaštitu
router.get('/me', auth, async (req, res) => {
  res.json({ userId: req.user.id });
});

module.exports = router;
