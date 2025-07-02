const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/users/login
router.post('/login', loginUser);

// POST /api/users
router.post('/', registerUser);
router.get('/profile', protect, async (req, res) => {
  res.json(req.user); // req.user is set by protect middleware
});

module.exports = router;
