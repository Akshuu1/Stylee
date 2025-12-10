const express = require('express');
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All wishlist routes require authentication
router.get('/', authMiddleware, getWishlist);
router.post('/:itemId', authMiddleware, addToWishlist);
router.delete('/:itemId', authMiddleware, removeFromWishlist);
router.delete('/', authMiddleware, clearWishlist);

module.exports = router;
