const Item = require("../models/Item");

// Get all items with search, filter, sort, and pagination
const getAllItems = async (req, res) => {
    try {
        const {
            search = "",
            category = "",
            brand = "",
            color = "",
            size = "",
            minPrice = 0,
            maxPrice = 999999,
            sortBy = "random", // Default to random as requested
            sortOrder = "desc",
            page = 1,
            limit = 12,
        } = req.query;

        // Parse query params with fallbacks for empty strings
        const pMinPrice = minPrice && minPrice !== "" ? parseFloat(minPrice) : 0;
        const pMaxPrice = maxPrice && maxPrice !== "" ? parseFloat(maxPrice) : 999999;
        const pPage = page && page !== "" ? parseInt(page) : 1;
        const pLimit = limit && limit !== "" ? parseInt(limit) : 12;

        // Build query object for filtering
        const query = {};

        // Search across multiple fields
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Filter by category, brand, color, size
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (color) query.color = color;
        if (size) query.size = size;

        // Price range filter
        query.price = { $gte: pMinPrice, $lte: pMaxPrice };

        // Calculate pagination
        const skip = (pPage - 1) * pLimit;
        const take = pLimit;

        // Get total count for pagination
        const totalItems = await Item.countDocuments(query);

        let items;

        if (sortBy === "random") {
            // Fetch ALL matching items to shuffle globally (ok for small dataset)
            const allItems = await Item.find(query)
                .populate('createdBy', 'name email');

            // Fisher-Yates Shuffle
            for (let i = allItems.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
            }

            // Apply pagination in-memory
            items = allItems.slice(skip, skip + take);

        } else {
            // Standard Database Sorting
            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

            items = await Item.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(take)
                .populate('createdBy', 'name email');
        }

        // Transform items to match expected format (rename createdBy to user)
        const itemsWithUser = items.map(item => {
            const itemObj = item.toObject();
            return {
                ...itemObj,
                id: itemObj._id,
                user: itemObj.createdBy ? {
                    id: itemObj.createdBy._id,
                    name: itemObj.createdBy.name,
                    email: itemObj.createdBy.email
                } : null
            };
        });

        res.json({
            items: itemsWithUser,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalItems / take),
                totalItems,
                itemsPerPage: take,
            },
        });
    } catch (error) {
        console.error("GET ALL ITEMS ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get single item by ID
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findById(id)
            .populate('createdBy', 'name email');

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Transform to match expected format
        const itemObj = item.toObject();
        const itemWithUser = {
            ...itemObj,
            id: itemObj._id,
            user: itemObj.createdBy ? {
                id: itemObj.createdBy._id,
                name: itemObj.createdBy.name,
                email: itemObj.createdBy.email
            } : null
        };

        res.json({ item: itemWithUser });
    } catch (error) {
        console.error("GET ITEM BY ID ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Create new item
const createItem = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            brand,
            color,
            size,
            images,
            tags,
            stock,
        } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                message: "Name, description, price, and category are required"
            });
        }

        const newItem = await Item.create({
            name,
            description,
            price: parseFloat(price),
            category,
            brand: brand || null,
            color: color || null,
            size: size || null,
            images: images || [],
            tags: tags || [],
            stock: stock ? parseInt(stock) : 0,
            createdBy: req.user.id,
        });

        // Populate user data
        await newItem.populate('createdBy', 'name email');

        // Transform to match expected format
        const itemObj = newItem.toObject();
        const itemWithUser = {
            ...itemObj,
            id: itemObj._id,
            user: itemObj.createdBy ? {
                id: itemObj.createdBy._id,
                name: itemObj.createdBy.name,
                email: itemObj.createdBy.email
            } : null
        };

        res.status(201).json({
            message: "Item created successfully!",
            item: itemWithUser
        });
    } catch (error) {
        console.error("CREATE ITEM ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            category,
            brand,
            color,
            size,
            images,
            tags,
            stock,
            popularity,
        } = req.body;

        // Check if item exists
        const existingItem = await Item.findById(id);

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if user owns the item or is admin
        if (existingItem.createdBy.toString() !== req.user.id && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "You don't have permission to update this item" });
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = parseFloat(price);
        if (category) updateData.category = category;
        if (brand !== undefined) updateData.brand = brand;
        if (color !== undefined) updateData.color = color;
        if (size !== undefined) updateData.size = size;
        if (images) updateData.images = images;
        if (tags !== undefined) updateData.tags = tags;
        if (stock !== undefined) updateData.stock = parseInt(stock);
        if (popularity !== undefined) updateData.popularity = parseInt(popularity);

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        // Transform to match expected format
        const itemObj = updatedItem.toObject();
        const itemWithUser = {
            ...itemObj,
            id: itemObj._id,
            user: itemObj.createdBy ? {
                id: itemObj.createdBy._id,
                name: itemObj.createdBy.name,
                email: itemObj.createdBy.email
            } : null
        };

        res.json({
            message: "Item updated successfully!",
            item: itemWithUser
        });
    } catch (error) {
        console.error("UPDATE ITEM ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all unique categories
const getCategories = async (req, res) => {
    try {
        const categories = await Item.distinct('category');

        // Return sorted array of strings
        const categoryList = categories.sort();
        res.json(categoryList);
    } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete item (Admin only)
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        await Item.findByIdAndDelete(id);

        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        console.error("DELETE ITEM ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getCategories
};
