import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { itemsAPI, usersAPI } from "../services/api";

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
        <div className="min-h-screen bg-zinc-900 text-white pt-20 px-4 sm:px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-5xl font-bold mb-8">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${activeTab === "products" ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${activeTab === "users" ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"
                            }`}
                    >
                        Users
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === "products" && (
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold">Manage Products</h2>
                            <button
                                onClick={() => {
                                    setShowItemForm(true);
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
                                }}
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition text-sm sm:text-base"
                            >
                                + Add Product
                            </button>
                        </div>

                        {/* Item Form Modal */}
                        {showItemForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <div className="bg-zinc-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                    <h3 className="text-2xl font-bold mb-4">
                                        {editingItem ? "Edit Product" : "Add New Product"}
                                    </h3>
                                    <form onSubmit={handleCreateItem} className="space-y-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Product Name *"
                                            value={itemForm.name}
                                            onChange={handleItemFormChange}
                                            required
                                            className="w-full px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <textarea
                                            name="description"
                                            placeholder="Description *"
                                            value={itemForm.description}
                                            onChange={handleItemFormChange}
                                            required
                                            rows="3"
                                            className="w-full px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="number"
                                                name="price"
                                                placeholder="Price *"
                                                value={itemForm.price}
                                                onChange={handleItemFormChange}
                                                required
                                                step="0.01"
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                name="stock"
                                                placeholder="Stock *"
                                                value={itemForm.stock}
                                                onChange={handleItemFormChange}
                                                required
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="category"
                                                placeholder="Category *"
                                                value={itemForm.category}
                                                onChange={handleItemFormChange}
                                                required
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                name="brand"
                                                placeholder="Brand"
                                                value={itemForm.brand}
                                                onChange={handleItemFormChange}
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="color"
                                                placeholder="Color"
                                                value={itemForm.color}
                                                onChange={handleItemFormChange}
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                name="size"
                                                placeholder="Size"
                                                value={itemForm.size}
                                                onChange={handleItemFormChange}
                                                className="px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="images"
                                            placeholder="Image URLs (comma-separated)"
                                            value={itemForm.images}
                                            onChange={handleItemFormChange}
                                            className="w-full px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            name="tags"
                                            placeholder="Tags (comma-separated)"
                                            value={itemForm.tags}
                                            onChange={handleItemFormChange}
                                            className="w-full px-4 py-2 bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex gap-4">
                                            <button
                                                type="submit"
                                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
                                            >
                                                {editingItem ? "Update" : "Create"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowItemForm(false);
                                                    setEditingItem(null);
                                                }}
                                                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-semibold transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Products List */}
                        {itemsLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="bg-zinc-800 rounded-lg overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead className="bg-zinc-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Name</th>
                                            <th className="px-4 py-3 text-left">Category</th>
                                            <th className="px-4 py-3 text-left">Price</th>
                                            <th className="px-4 py-3 text-left">Stock</th>
                                            <th className="px-4 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className="border-t border-zinc-700">
                                                <td className="px-4 py-3">{item.name}</td>
                                                <td className="px-4 py-3">{item.category}</td>
                                                <td className="px-4 py-3">${item.price}</td>
                                                <td className="px-4 py-3">{item.stock}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditItem(item)}
                                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
                        {usersLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="bg-zinc-800 rounded-lg overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead className="bg-zinc-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Name</th>
                                            <th className="px-4 py-3 text-left">Email</th>
                                            <th className="px-4 py-3 text-left">Role</th>
                                            <th className="px-4 py-3 text-left">Items</th>
                                            <th className="px-4 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-t border-zinc-700">
                                                <td className="px-4 py-3">{user.name}</td>
                                                <td className="px-4 py-3">{user.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN" ? "bg-purple-600" : "bg-blue-600"
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{user._count?.items || 0}</td>
                                                <td className="px-4 py-3">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                        className="px-3 py-1 bg-zinc-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="USER">USER</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
