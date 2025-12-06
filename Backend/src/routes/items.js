const express = require("express");
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getCategories
} = require("../controllers/itemController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

const router = express.Router();

// Public routes - anyone can view items
router.get("/categories", getCategories); // Must be before /:id
router.get("/", getAllItems);
router.get("/:id", getItemById);

// Protected routes - authenticated users can create and update
router.post("/", authMiddleware, createItem);
router.put("/:id", authMiddleware, updateItem);

// Admin only routes
router.delete("/:id", authMiddleware, adminMiddleware, deleteItem);

module.exports = router;
