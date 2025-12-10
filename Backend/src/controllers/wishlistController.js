const User = require('../models/User');
const Item = require('../models/Item');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'wishlist',
            select: 'name description price category brand color size images tags stock popularity'
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Wishlist retrieved successfully',
            wishlist: user.wishlist || []
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({
            message: 'Failed to retrieve wishlist',
            error: error.message
        });
    }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;

        // Check if item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Find user and update wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if item is already in wishlist
        if (user.wishlist.includes(itemId)) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }

        // Add item to wishlist
        user.wishlist.push(itemId);
        await user.save();

        res.json({
            message: 'Item added to wishlist successfully',
            wishlist: user.wishlist
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({
            message: 'Failed to add item to wishlist',
            error: error.message
        });
    }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;

        // Find user and update wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if item is in wishlist
        const itemIndex = user.wishlist.indexOf(itemId);
        if (itemIndex === -1) {
            return res.status(400).json({ message: 'Item not in wishlist' });
        }

        // Remove item from wishlist
        user.wishlist.splice(itemIndex, 1);
        await user.save();

        res.json({
            message: 'Item removed from wishlist successfully',
            wishlist: user.wishlist
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({
            message: 'Failed to remove item from wishlist',
            error: error.message
        });
    }
};

// Clear entire wishlist
exports.clearWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user and clear wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishlist = [];
        await user.save();

        res.json({
            message: 'Wishlist cleared successfully',
            wishlist: []
        });
    } catch (error) {
        console.error('Clear wishlist error:', error);
        res.status(500).json({
            message: 'Failed to clear wishlist',
            error: error.message
        });
    }
};
