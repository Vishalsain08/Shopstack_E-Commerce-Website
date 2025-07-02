const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Create new order
router.post('/', protect, createOrder);

// Get orders of logged-in user
router.get('/myorders', protect, getMyOrders);

// Get all orders (admin only)
router.get('/', protect, admin, getAllOrders);

module.exports = router;
