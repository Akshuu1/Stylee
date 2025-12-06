const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
            sortBy = "createdAt",
            sortOrder = "desc",
            page = 1,
            limit = 12,
        } = req.query;

        // Parse query params with fallbacks for empty strings
        const pMinPrice = minPrice && minPrice !== "" ? parseFloat(minPrice) : 0;
        const pMaxPrice = maxPrice && maxPrice !== "" ? parseFloat(maxPrice) : 999999;
        const pPage = page && page !== "" ? parseInt(page) : 1;
        const pLimit = limit && limit !== "" ? parseInt(limit) : 12;

        // Build where clause for filtering
        const where = {
            AND: [
                search ? {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } },
                        { tags: { contains: search } },
                    ],
                } : {},
                category ? { category: { equals: category } } : {},
                brand ? { brand: { equals: brand } } : {},
                color ? { color: { equals: color } } : {},
                size ? { size: { equals: size } } : {},
                {
                    price: {
                        gte: pMinPrice,
                        lte: pMaxPrice,
                    },
                },
            ],
        };

        // Build orderBy clause
        const orderBy = {};
        orderBy[sortBy] = sortOrder;

        // Calculate pagination
        const skip = (pPage - 1) * pLimit;
        const take = pLimit;

        // Get total count for pagination
        const totalItems = await prisma.item.count({ where });

        // Get items
        const items = await prisma.item.findMany({
            where,
            orderBy,
            skip,
            take,
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        // Parse images from JSON string
        const itemsWithParsedImages = items.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            tags: item.tags ? item.tags.split(',').map(tag => tag.trim()) : [],
        }));

        res.json({
            items: itemsWithParsedImages,
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

        const item = await prisma.item.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Parse images and tags
        const itemWithParsedData = {
            ...item,
            images: item.images ? JSON.parse(item.images) : [],
            tags: item.tags ? item.tags.split(',').map(tag => tag.trim()) : [],
        };

        res.json({ item: itemWithParsedData });
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

        // Convert images array to JSON string
        const imagesString = JSON.stringify(images || []);

        // Convert tags array to comma-separated string
        const tagsString = Array.isArray(tags) ? tags.join(', ') : tags || '';

        const newItem = await prisma.item.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                brand: brand || null,
                color: color || null,
                size: size || null,
                images: imagesString,
                tags: tagsString,
                stock: stock ? parseInt(stock) : 0,
                createdBy: req.user.id,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        // Parse images and tags for response
        const itemWithParsedData = {
            ...newItem,
            images: JSON.parse(newItem.images),
            tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : [],
        };

        res.status(201).json({
            message: "Item created successfully!",
            item: itemWithParsedData
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
        const existingItem = await prisma.item.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if user owns the item or is admin
        if (existingItem.createdBy !== req.user.id && req.user.role !== "ADMIN") {
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
        if (images) updateData.images = JSON.stringify(images);
        if (tags !== undefined) {
            updateData.tags = Array.isArray(tags) ? tags.join(', ') : tags;
        }
        if (stock !== undefined) updateData.stock = parseInt(stock);
        if (popularity !== undefined) updateData.popularity = parseInt(popularity);

        const updatedItem = await prisma.item.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        // Parse images and tags for response
        const itemWithParsedData = {
            ...updatedItem,
            images: JSON.parse(updatedItem.images),
            tags: updatedItem.tags ? updatedItem.tags.split(',').map(tag => tag.trim()) : [],
        };

        res.json({
            message: "Item updated successfully!",
            item: itemWithParsedData
        });
    } catch (error) {
        console.error("UPDATE ITEM ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete item (Admin only)
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.item.findUnique({
            where: { id: parseInt(id) },
        });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        await prisma.item.delete({
            where: { id: parseInt(id) },
        });

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
};
