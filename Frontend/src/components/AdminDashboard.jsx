import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { itemsAPI, usersAPI } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
    const { isAdmin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");

    // Products state
    const [items, setItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(false);

    // Users state
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    // Form state
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [itemForm, setItemForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        color: "",
        size: "",
        images: "",
        tags: "",
        stock: "",
    });

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }
        if (!isAdmin()) {
            navigate("/");
            return;
        }
    }, [isAuthenticated, isAdmin, navigate]);

    useEffect(() => {
        if (activeTab === "products") {
            fetchItems();
        } else if (activeTab === "users") {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchItems = async () => {
        setItemsLoading(true);
        try {
            const response = await itemsAPI.getAll({ limit: 100 });
            setItems(response.data.items);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setItemsLoading(false);
        }
    };

    const fetchUsers = async () => {
        setUsersLoading(true);
        try {
            const response = await usersAPI.getAll({ limit: 100 });
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setUsersLoading(false);
        }
    };

    const handleItemFormChange = (e) => {
        setItemForm({ ...itemForm, [e.target.name]: e.target.value });
    };

    const handleCreateItem = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...itemForm,
                price: parseFloat(itemForm.price),
                stock: parseInt(itemForm.stock),
                images: itemForm.images ? itemForm.images.split(",").map(img => img.trim()) : [],
                tags: itemForm.tags ? itemForm.tags.split(",").map(tag => tag.trim()) : [],
            };

            if (editingItem) {
                await itemsAPI.update(editingItem.id, data);
            } else {
                await itemsAPI.create(data);
            }

            setShowItemForm(false);
            setEditingItem(null);
            setItemForm({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                color: "",
                size: "",
                images: "",
                tags: "",
                stock: "",
            });
            fetchItems();
        } catch (error) {
            console.error("Error saving item:", error);
            alert(error.response?.data?.message || "Failed to save item");
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setItemForm({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            category: item.category,
            brand: item.brand || "",
            color: item.color || "",
            size: item.size || "",
            images: Array.isArray(item.images) ? item.images.join(", ") : "",
            tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
            stock: item.stock.toString(),
        });
        setShowItemForm(true);
    };

    const handleDeleteItem = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await itemsAPI.delete(id);
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert(error.response?.data?.message || "Failed to delete item");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            return;
        }

        try {
            await usersAPI.delete(userId);
            // Refresh users list
            fetchUsers();
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert(error.response?.data?.message || "Failed to delete user");
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await usersAPI.update(userId, { role: newRole });
            fetchUsers();
        } catch (error) {
            console.error("Error updating user role:", error);
            alert(error.response?.data?.message || "Failed to update user role");
        }
    };

    if (!isAuthenticated() || !isAdmin()) {
        return null;
    }

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-24 px-4 sm:px-6 pb-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 style={{ fontFamily: "Beikho" }} className="text-4xl sm:text-6xl font-bold text-[#CDEA68] mb-2">Admin Dashboard</h1>
                        <p className="text-zinc-400">Manage your store products and users</p>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex bg-zinc-900/40 backdrop-blur-xl p-1 rounded-2xl border border-[#CDEA68]/20 mt-6 sm:mt-0"
                    >
                        <button
                            onClick={() => setActiveTab("products")}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === "products"
                                ? "bg-[#CDEA68] text-[#004D54] shadow-lg shadow-[#CDEA68]/20"
                                : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            📦 Products
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === "users"
                                ? "bg-[#CDEA68] text-[#004D54] shadow-lg shadow-[#CDEA68]/20"
                                : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            👥 Users
                        </button>
                    </motion.div>
                </div>

                {/* Content Area */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-[#CDEA68]/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* Products Tab */}
                        {activeTab === "products" && (
                            <motion.div
                                key="products"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <span className="text-[#CDEA68]">Create</span> & Manage
                                    </h2>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setShowItemForm(true);
                                            setEditingItem(null);
                                            setItemForm({
                                                name: "", description: "", price: "", category: "", brand: "",
                                                color: "", size: "", images: "", tags: "", stock: "",
                                            });
                                        }}
                                        className="px-6 py-3 bg-[#CDEA68] text-[#004D54] hover:bg-[#dfff7a] rounded-xl font-bold transition-all shadow-lg hover:shadow-[#CDEA68]/20 flex items-center gap-2"
                                    >
                                        <span>+</span> Add New Product
                                    </motion.button>
                                </div>

                                {/* Products List */}
                                {itemsLoading ? (
                                    <div className="text-center py-20">
                                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CDEA68]"></div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px] border-collapse">
                                            <thead>
                                                <tr className="border-b border-zinc-700/50 text-[#CDEA68] text-sm uppercase tracking-wider">
                                                    <th className="px-6 py-4 text-left font-semibold">Product</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Stock</th>
                                                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800/50">
                                                {items.map((item) => (
                                                    <motion.tr
                                                        key={item.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="group hover:bg-white/5 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 font-medium">{item.name}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 bg-[#CDEA68]/10 text-[#CDEA68] rounded-full text-xs font-bold border border-[#CDEA68]/20">
                                                                {item.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold">${item.price}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                                {item.stock} in stock
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right space-x-2">
                                                            <button
                                                                onClick={() => handleEditItem(item)}
                                                                className="px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-semibold transition-all"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteItem(item.id)}
                                                                className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-semibold transition-all"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Users Tab */}
                        {activeTab === "users" && (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h2 className="text-2xl font-bold mb-8 text-white">Manage User Access</h2>
                                {usersLoading ? (
                                    <div className="text-center py-20">
                                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CDEA68]"></div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px] border-collapse">
                                            <thead>
                                                <tr className="border-b border-zinc-700/50 text-[#CDEA68] text-sm uppercase tracking-wider">
                                                    <th className="px-6 py-4 text-left font-semibold">User Name</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Email Address</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Current Role</th>
                                                    <th className="px-6 py-4 text-left font-semibold">Total Items</th>
                                                    <th className="px-6 py-4 text-right font-semibold">Role Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800/50">
                                                {users.map((user) => (
                                                    <motion.tr
                                                        key={user.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="group hover:bg-white/5 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 font-bold">{user.name}</td>
                                                        <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${user.role === "ADMIN"
                                                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                                }`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">{user._count?.items || 0}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end items-center gap-3">
                                                                <select
                                                                    value={user.role}
                                                                    onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                                    className="px-4 py-2 bg-black/30 rounded-lg text-sm border border-zinc-700 focus:border-[#CDEA68] focus:outline-none cursor-pointer"
                                                                >
                                                                    <option value="USER">User</option>
                                                                    <option value="ADMIN">Admin</option>
                                                                </select>
                                                                <button
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                    className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-semibold transition-all border border-red-500/20 hover:border-red-500/50"
                                                                    title="Delete User"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Item Form Modal - Moved outside to prevent positioning issues */}
            <AnimatePresence>
                {showItemForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-zinc-900 border border-[#CDEA68]/20 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <h3 className="text-3xl font-bold mb-6 text-[#CDEA68]" style={{ fontFamily: "Beikho" }}>
                                {editingItem ? "Edit Product" : "New Collection Item"}
                            </h3>
                            <form onSubmit={handleCreateItem} className="space-y-4">
                                <div className="space-y-4">
                                    <input
                                        type="text" name="name" placeholder="Product Name *" value={itemForm.name} onChange={handleItemFormChange} required
                                        className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none focus:ring-1 focus:ring-[#CDEA68]"
                                    />
                                    <textarea
                                        name="description" placeholder="Description *" value={itemForm.description} onChange={handleItemFormChange} required rows="3"
                                        className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none focus:ring-1 focus:ring-[#CDEA68]"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="number" name="price" placeholder="Price ($) *" value={itemForm.price} onChange={handleItemFormChange} required step="0.01" className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                        <input type="number" name="stock" placeholder="Stock Qty *" value={itemForm.stock} onChange={handleItemFormChange} required className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="category" placeholder="Category *" value={itemForm.category} onChange={handleItemFormChange} required className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                        <input type="text" name="brand" placeholder="Brand" value={itemForm.brand} onChange={handleItemFormChange} className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="color" placeholder="Color" value={itemForm.color} onChange={handleItemFormChange} className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                        <input type="text" name="size" placeholder="Size" value={itemForm.size} onChange={handleItemFormChange} className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                    </div>
                                    <input type="text" name="images" placeholder="Image URLs (comma-separated)" value={itemForm.images} onChange={handleItemFormChange} className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                    <input type="text" name="tags" placeholder="Tags (comma-separated)" value={itemForm.tags} onChange={handleItemFormChange} className="w-full px-5 py-3 bg-black/30 text-white rounded-xl border border-zinc-700/50 focus:border-[#CDEA68] focus:outline-none" />
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-zinc-700/50 mt-6">
                                    <button type="submit" className="flex-1 px-6 py-3 bg-[#CDEA68] text-[#004D54] rounded-xl font-bold hover:bg-[#dfff7a] transition-all">
                                        {editingItem ? "Update Product" : "Create Product"}
                                    </button>
                                    <button type="button" onClick={() => { setShowItemForm(false); setEditingItem(null); }} className="px-8 py-3 bg-transparent border border-zinc-600 text-zinc-300 rounded-xl font-bold hover:bg-zinc-800 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default AdminDashboard;
