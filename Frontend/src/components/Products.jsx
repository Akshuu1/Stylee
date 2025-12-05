import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { itemsAPI } from "../services/api";

const Products = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const limit = 12;

    // Fetch items
    const fetchItems = async () => {
        setLoading(true);
        try {
            const params = {
                search,
                category,
                brand,
                color,
                size,
                minPrice,
                maxPrice,
                sortBy,
                sortOrder,
                page,
                limit,
            };

            const response = await itemsAPI.getAll(params);
            setItems(response.data.items);
            setPagination(response.data.pagination);
            setError(null);
        } catch (err) {
            console.error("Error fetching items:", err);
            setError(err.response?.data?.message || "Failed to load products. Please make sure the database is set up.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [search, category, brand, color, size, minPrice, maxPrice, sortBy, sortOrder, page]);

    const handleResetFilters = () => {
        setSearch("");
        setCategory("");
        setBrand("");
        setColor("");
        setSize("");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("createdAt");
        setSortOrder("desc");
        setPage(1);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-24 px-6 pb-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 -left-20 w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.02, 0.05, 0.02]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 -right-20 w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 text-center"
                >
                    <motion.h1
                        className="text-7xl font-bold mb-4 text-[#CDEA68]"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(205, 234, 104, 0.3)",
                                "0 0 40px rgba(205, 234, 104, 0.5)",
                                "0 0 20px rgba(205, 234, 104, 0.3)"
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        Discover Style
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-zinc-400"
                    >
                        Curated fashion pieces for the modern you
                    </motion.p>
                </motion.div>

                {/* Search and Filters with Glassmorphism */}
                <motion.div
                    variants={filterVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-zinc-900/60 backdrop-blur-2xl rounded-3xl p-8 mb-12 border border-[#CDEA68]/20 shadow-2xl"
                >
                    {/* Search with Icon */}
                    <div className="mb-6 relative">
                        <motion.div
                            whileFocus={{ scale: 1.02 }}
                            className="relative"
                        >
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                            <input
                                type="text"
                                placeholder="Search for your perfect style..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full pl-14 pr-6 py-4 bg-zinc-800/80 text-white rounded-2xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] focus:border-transparent placeholder-zinc-400 transition-all duration-300"
                            />
                        </motion.div>
                    </div>

                    {/* Filters Grid with Hover Effects */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                        {[
                            { placeholder: "Category 👔", value: category, setter: setCategory },
                            { placeholder: "Brand 🏷️", value: brand, setter: setBrand },
                            { placeholder: "Color 🎨", value: color, setter: setColor },
                            { placeholder: "Size 📏", value: size, setter: setSize }
                        ].map((filter, idx) => (
                            <motion.input
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileFocus={{ scale: 1.05 }}
                                type="text"
                                placeholder={filter.placeholder}
                                value={filter.value}
                                onChange={(e) => {
                                    filter.setter(e.target.value);
                                    setPage(1);
                                }}
                                className="px-4 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] focus:border-transparent placeholder-zinc-400 transition-all duration-300"
                            />
                        ))}
                        <div className="flex gap-2">
                            <motion.input
                                whileHover={{ scale: 1.05 }}
                                whileFocus={{ scale: 1.05 }}
                                type="number"
                                placeholder="Min 💰"
                                value={minPrice}
                                onChange={(e) => {
                                    setMinPrice(e.target.value);
                                    setPage(1);
                                }}
                                className="w-1/2 px-4 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] focus:border-transparent placeholder-zinc-400 transition-all duration-300"
                            />
                            <motion.input
                                whileHover={{ scale: 1.05 }}
                                whileFocus={{ scale: 1.05 }}
                                type="number"
                                placeholder="Max 💰"
                                value={maxPrice}
                                onChange={(e) => {
                                    setMaxPrice(e.target.value);
                                    setPage(1);
                                }}
                                className="w-1/2 px-4 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] focus:border-transparent placeholder-zinc-400 transition-all duration-300"
                            />
                        </div>
                    </div>

                    {/* Sort and Reset with Animated Buttons */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <motion.select
                            whileHover={{ scale: 1.05 }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-6 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] transition-all duration-300 cursor-pointer"
                        >
                            <option value="createdAt" className="bg-zinc-900">📅 Date</option>
                            <option value="price" className="bg-zinc-900">💵 Price</option>
                            <option value="popularity" className="bg-zinc-900">⭐ Popularity</option>
                            <option value="name" className="bg-zinc-900">🔤 Name</option>
                        </motion.select>
                        <motion.select
                            whileHover={{ scale: 1.05 }}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-6 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68] transition-all duration-300 cursor-pointer"
                        >
                            <option value="asc" className="bg-zinc-900">⬆️ Ascending</option>
                            <option value="desc" className="bg-zinc-900">⬇️ Descending</option>
                        </motion.select>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleResetFilters}
                            className="px-8 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl transition-all duration-300 font-semibold border border-red-500/30"
                        >
                            🔄 Reset Filters
                        </motion.button>
                    </div>
                </motion.div>

                {/* Loading State with Animated Spinner */}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block w-20 h-20 border-4 border-[#CDEA68] border-t-transparent rounded-full"
                            />
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mt-6 text-xl text-zinc-400"
                            >
                                Loading amazing products...
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error State */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-red-900/20 border border-red-500/50 rounded-3xl p-8 mb-8 backdrop-blur-2xl"
                        >
                            <p className="text-red-400 mb-4 text-lg">⚠️ {error}</p>
                            <p className="text-zinc-400 text-sm mb-4">
                                It looks like the database hasn't been set up yet. Please run the migration:
                            </p>
                            <code className="block bg-zinc-900/80 p-6 rounded-2xl text-[#CDEA68] text-sm font-mono">
                                cd Backend<br />
                                npx prisma migrate dev --name add_items_and_roles
                            </code>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Grid with Stagger Animation */}
                {!loading && !error && (
                    <>
                        {items.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20 bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-[#CDEA68]/20"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-8xl mb-6"
                                >
                                    📦
                                </motion.div>
                                <p className="text-zinc-400 text-2xl mb-4">No products found</p>
                                <p className="text-zinc-500 text-sm mb-8">
                                    Add products through the admin dashboard or run the database migration first.
                                </p>
                                <Link
                                    to="/admin"
                                    className="inline-block px-8 py-4 bg-[#CDEA68] text-[#004D54] rounded-2xl font-bold hover:bg-[#dfff7a] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#CDEA68]/30"
                                >
                                    🚀 Go to Admin Dashboard
                                </Link>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                >
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            variants={cardVariants}
                                            whileHover={{
                                                y: -10,
                                                transition: { duration: 0.3 }
                                            }}
                                            onHoverStart={() => setHoveredCard(item.id)}
                                            onHoverEnd={() => setHoveredCard(null)}
                                        >
                                            <Link
                                                to={`/products/${item.id}`}
                                                className="block group"
                                            >
                                                <div className="bg-zinc-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-[#CDEA68]/20 hover:border-[#CDEA68]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#CDEA68]/20">
                                                    {/* Image Container with Overlay */}
                                                    <div className="relative aspect-square bg-zinc-800/50 overflow-hidden">
                                                        {item.images && item.images.length > 0 ? (
                                                            <>
                                                                <motion.img
                                                                    src={item.images[0]}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    animate={{
                                                                        scale: hoveredCard === item.id ? 1.1 : 1
                                                                    }}
                                                                    transition={{ duration: 0.5 }}
                                                                />
                                                                {/* Gradient Overlay on Hover */}
                                                                <motion.div
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: hoveredCard === item.id ? 1 : 0 }}
                                                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                                                                />
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                                    className="text-[#CDEA68]/30 text-6xl"
                                                                >
                                                                    📦
                                                                </motion.div>
                                                            </div>
                                                        )}

                                                        {/* Stock Badge */}
                                                        <motion.div
                                                            initial={{ x: 100 }}
                                                            animate={{ x: 0 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="absolute top-4 right-4"
                                                        >
                                                            {item.stock > 0 ? (
                                                                <span className="px-4 py-2 bg-green-500/90 backdrop-blur-xl text-white text-xs font-bold rounded-full shadow-lg">
                                                                    ✓ In Stock
                                                                </span>
                                                            ) : (
                                                                <span className="px-4 py-2 bg-red-500/90 backdrop-blur-xl text-white text-xs font-bold rounded-full shadow-lg">
                                                                    ✗ Out of Stock
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="p-6">
                                                        <motion.h3
                                                            className="text-xl font-bold mb-2 text-[#CDEA68] truncate"
                                                            animate={{
                                                                color: hoveredCard === item.id ? "#dfff7a" : "#CDEA68"
                                                            }}
                                                        >
                                                            {item.name}
                                                        </motion.h3>
                                                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 h-10">
                                                            {item.description}
                                                        </p>

                                                        {/* Price and Category */}
                                                        <div className="flex justify-between items-end">
                                                            <motion.div
                                                                animate={{
                                                                    scale: hoveredCard === item.id ? 1.1 : 1
                                                                }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <span className="text-3xl font-bold text-[#CDEA68]">
                                                                    ${item.price}
                                                                </span>
                                                            </motion.div>
                                                            {item.category && (
                                                                <span className="px-3 py-1 bg-[#CDEA68]/20 border border-[#CDEA68]/30 rounded-full text-xs text-[#CDEA68] font-semibold">
                                                                    {item.category}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* View Details Button (appears on hover) */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{
                                                                opacity: hoveredCard === item.id ? 1 : 0,
                                                                y: hoveredCard === item.id ? 0 : 10
                                                            }}
                                                            className="mt-4"
                                                        >
                                                            <div className="w-full py-3 bg-[#CDEA68] text-[#004D54] rounded-xl font-bold text-center shadow-lg shadow-[#CDEA68]/30">
                                                                View Details →
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pagination with Animations */}
                                {pagination && pagination.totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-16 flex justify-center items-center gap-6"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.1, x: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-8 py-4 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800/80 hover:border-[#CDEA68]/50 transition-all duration-300 font-semibold shadow-lg"
                                        >
                                            ← Previous
                                        </motion.button>

                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="px-6 py-4 bg-[#CDEA68]/20 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/30 font-bold text-[#CDEA68]"
                                        >
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </motion.div>

                                        <motion.button
                                            whileHover={{ scale: 1.1, x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === pagination.totalPages}
                                            className="px-8 py-4 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800/80 hover:border-[#CDEA68]/50 transition-all duration-300 font-semibold shadow-lg"
                                        >
                                            Next →
                                        </motion.button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
