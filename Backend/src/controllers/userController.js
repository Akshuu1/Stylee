const User = require("../models/User");
const bcrypt = require("bcryptjs");
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const totalUsers = await User.countDocuments();

        const users = await User.find()
            .skip(skip)
            .limit(take)
            .select('name email role createdAt updatedAt')
            .sort({ createdAt: -1 })
            .lean();
        const Item = require("../models/Item");
        const usersWithItemCount = await Promise.all(
            users.map(async (user) => {
                const itemCount = await Item.countDocuments({ createdBy: user._id });
                return {
                    ...user,
                    id: user._id,
                    _count: {
                        items: itemCount
                    }
                };
            })
        );

        res.json({
            users: usersWithItemCount,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalUsers / take),
                totalUsers,
                usersPerPage: take,
            },
        });
    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('name email role createdAt updatedAt')
            .lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const Item = require("../models/Item");
        const items = await Item.find({ createdBy: id })
            .select('name price category createdAt')
            .lean();
        const transformedItems = items.map(item => ({
            ...item,
            id: item._id
        }));

        res.json({
            user: {
                ...user,
                id: user._id,
                items: transformedItems
            }
        });
    } catch (error) {
        console.error("GET USER BY ID ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, password } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role && (role === "USER" || role === "ADMIN")) {
            updateData.role = role;
        }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('name email role createdAt updatedAt');

        res.json({
            message: "User updated successfully!",
            user: {
                ...updatedUser.toObject(),
                id: updatedUser._id
            }
        });
    } catch (error) {
        console.error("UPDATE USER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ message: "You cannot delete your own account" });
        }

        await User.findByIdAndDelete(id);

        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error("DELETE USER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
