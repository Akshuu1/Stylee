import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { itemsAPI, wishlistAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Products = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [viewMode, setViewMode] = useState("bento"); // bento, grid, list

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
    const [categories, setCategories] = useState([]); // New state for categories dropdown
    const [wishlistItems, setWishlistItems] = useState([]);
    const { isAuthenticated, isGuest } = useAuth();

    const limit = 12;
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -50]);
    const y2 = useTransform(scrollY, [0, 300], [0, 50]);

    // Fetch items
    const fetchItems = async () => {
        setLoading(true);
        console.log("Fetching items with params:", { search, category, brand, color, size, minPrice, maxPrice, sortBy, sortOrder, page });
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
            console.log("API Response:", response.data);
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

    // Fetch unique categories on mount
    useEffect(() => {
        itemsAPI.getCategories()
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) setCategories(data);
            })
            .catch(err => console.error("Failed to fetch categories:", err));
    }, []);

    useEffect(() => {
        fetchItems();
        fetchWishlist();
    }, [search, category, brand, color, size, minPrice, maxPrice, sortBy, sortOrder, page]);

    const fetchWishlist = async () => {
        try {
            if (isGuest()) {
                // Load from localStorage for guests
                const localWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                setWishlistItems(localWishlist.map(item => item._id || item.id));
            } else if (isAuthenticated()) {
                // Load from backend for authenticated users
                const response = await wishlistAPI.getWishlist();
                setWishlistItems(response.data.wishlist.map(item => item._id || item));
            }
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
        }
    };



    const toggleWishlist = async (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        const itemId = item._id || item.id;
        const isInWishlist = wishlistItems.includes(itemId);

        try {
            if (isGuest()) {
                // Handle guest wishlist in localStorage
                const localWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                if (isInWishlist) {
                    const updated = localWishlist.filter(i => (i._id || i.id) !== itemId);
                    localStorage.setItem("guestWishlist", JSON.stringify(updated));
                    setWishlistItems(updated.map(i => i._id || i.id));
                } else {
                    localWishlist.push(item);
                    localStorage.setItem("guestWishlist", JSON.stringify(localWishlist));
                    setWishlistItems(localWishlist.map(i => i._id || i.id));
                }
            } else if (isAuthenticated()) {
                // Handle authenticated user wishlist via API
                if (isInWishlist) {
                    await wishlistAPI.removeFromWishlist(itemId);
                    setWishlistItems(prev => prev.filter(id => id !== itemId));
                } else {
                    await wishlistAPI.addToWishlist(itemId);
                    setWishlistItems(prev => [...prev, itemId]);
                }
            }
        } catch (err) {
            console.error("Wishlist toggle error:", err);
        }
    };

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

    // Bento grid layout pattern - creates varied card sizes
    // Bento grid layout pattern - creates varied card sizes
    const getBentoClass = (index) => {
        const patterns = [
            "md:col-span-2 md:row-span-2 col-span-1 row-span-1", // Large
            "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small
            "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small
            "md:col-span-1 md:row-span-2 col-span-1 row-span-1", // Tall
            "md:col-span-2 md:row-span-1 col-span-1 row-span-1", // Wide
            "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small
        ];
        return patterns[index % patterns.length];
    };

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-20 px-4 sm:px-6 pb-12 relative overflow-hidden">
            {/* Animated Background with Parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                {/* Geometric patterns */}
                <div className="absolute top-40 right-1/4 w-48 h-48 sm:w-64 sm:h-64 border border-[#CDEA68]/10 rotate-45 rounded-3xl" />
                <div className="absolute bottom-40 left-1/4 w-32 h-32 sm:w-48 sm:h-48 border border-[#CDEA68]/10 -rotate-12 rounded-2xl" />
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Hero Section with Unique Layout */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 sm:mb-16"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-block px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/30 rounded-full text-[#CDEA68] text-xs sm:text-sm font-semibold mb-4"
                            >
                                Premium Collection
                            </motion.div>
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 text-[#CDEA68] leading-tight">
                                Discover<br />
                                <span className="text-white">Your Style</span>
                            </h1>
                            <p className="text-base sm:text-xl text-zinc-400 max-w-xl">
                                Curated fashion pieces that define modern elegance
                            </p>
                        </div>

                        {/* View Mode Switcher */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-2 bg-zinc-900/60 backdrop-blur-xl p-2 rounded-2xl border border-[#CDEA68]/20"
                        >
                            {[
                                { mode: "bento", icon: "◧", label: "Bento" },
                                { mode: "grid", icon: "▦", label: "Grid" },
                                { mode: "list", icon: "☰", label: "List" }
                            ].map((view) => (
                                <motion.button
                                    key={view.mode}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode(view.mode)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${viewMode === view.mode
                                        ? "bg-[#CDEA68] text-[#004D54]"
                                        : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <span className="text-xl mr-2">{view.icon}</span>
                                    {view.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Amazing Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 sm:mb-12"
                >
                    <div className="bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#CDEA68]/30 shadow-2xl shadow-[#CDEA68]/5">
                        {/* Search Bar with Glow Effect */}
                        <div className="mb-6">
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#CDEA68]/20 to-[#CDEA68]/5 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search for your perfect style..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        className="w-full pl-16 sm:pl-20 pr-6 py-4 sm:py-5 bg-zinc-800/80 text-white text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-[#CDEA68]/30 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 transition-all duration-300"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Active Filters Display */}
                        <AnimatePresence>
                            {(category || brand || color || size || minPrice || maxPrice) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-sm text-zinc-400 font-semibold">Active Filters:</span>
                                        {category && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/40 rounded-full text-[#CDEA68] text-sm font-semibold flex items-center gap-2 group hover:bg-[#CDEA68]/30 transition-all"
                                            >
                                                <span> {category}</span>
                                                <button
                                                    onClick={() => setCategory("")}
                                                    className="text-[#CDEA68] hover:text-white transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        )}
                                        {brand && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/40 rounded-full text-[#CDEA68] text-sm font-semibold flex items-center gap-2 group hover:bg-[#CDEA68]/30 transition-all"
                                            >
                                                <span>{brand}</span>
                                                <button
                                                    onClick={() => setBrand("")}
                                                    className="text-[#CDEA68] hover:text-white transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        )}
                                        {color && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/40 rounded-full text-[#CDEA68] text-sm font-semibold flex items-center gap-2 group hover:bg-[#CDEA68]/30 transition-all"
                                            >
                                                <span>{color}</span>
                                                <button
                                                    onClick={() => setColor("")}
                                                    className="text-[#CDEA68] hover:text-white transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        )}
                                        {size && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/40 rounded-full text-[#CDEA68] text-sm font-semibold flex items-center gap-2 group hover:bg-[#CDEA68]/30 transition-all"
                                            >
                                                <span> {size}</span>
                                                <button
                                                    onClick={() => setSize("")}
                                                    className="text-[#CDEA68] hover:text-white transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        )}
                                        {(minPrice || maxPrice) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="px-4 py-2 bg-[#CDEA68]/20 border border-[#CDEA68]/40 rounded-full text-[#CDEA68] text-sm font-semibold flex items-center gap-2 group hover:bg-[#CDEA68]/30 transition-all"
                                            >
                                                <span> ${minPrice || "0"} - ${maxPrice || "∞"}</span>
                                                <button
                                                    onClick={() => {
                                                        setMinPrice("");
                                                        setMaxPrice("");
                                                    }}
                                                    className="text-[#CDEA68] hover:text-white transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Filter Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {/* Category Dropdown */}
                            <motion.div whileHover={{ scale: 1.02 }} className="relative">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm appearance-none cursor-pointer transition-all duration-300"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat} className="bg-zinc-800 text-white">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom arrow icon */}
                                <div className="absolute right-4 top-[38px] pointer-events-none text-zinc-400">
                                    ▼
                                </div>
                            </motion.div>

                            {/* Brand */}
                            <motion.div whileHover={{ scale: 1.02 }} className="relative">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Nike, Adidas..."
                                    value={brand}
                                    onChange={(e) => { setBrand(e.target.value); setPage(1); }}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm transition-all duration-300"
                                />
                            </motion.div>

                            {/* Color */}
                            <motion.div whileHover={{ scale: 1.02 }} className="relative">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Black, White..."
                                    value={color}
                                    onChange={(e) => { setColor(e.target.value); setPage(1); }}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm transition-all duration-300"
                                />
                            </motion.div>

                            {/* Size */}
                            <motion.div whileHover={{ scale: 1.02 }} className="relative">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., M, L, XL..."
                                    value={size}
                                    onChange={(e) => { setSize(e.target.value); setPage(1); }}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm transition-all duration-300"
                                />
                            </motion.div>
                        </div>

                        {/* Price Range & Sort Controls */}
                        <div className="flex flex-wrap gap-4 items-end">
                            {/* Price Range */}
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Price Range
                                </label>
                                <div className="flex gap-3">
                                    <motion.input
                                        whileHover={{ scale: 1.02 }}
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                                        className="flex-1 px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm transition-all duration-300"
                                    />
                                    <span className="text-zinc-500 self-center">—</span>
                                    <motion.input
                                        whileHover={{ scale: 1.02 }}
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                                        className="flex-1 px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] placeholder-zinc-500 text-sm transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    Sort By
                                </label>
                                <motion.select
                                    whileHover={{ scale: 1.02 }}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] text-sm cursor-pointer transition-all duration-300"
                                >
                                    <option value="createdAt">Newest First</option>
                                    <option value="price"> Price</option>
                                    <option value="popularity"> Most Popular</option>
                                    <option value="name"> Name</option>
                                </motion.select>
                            </div>

                            {/* Sort Order */}
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-xs text-[#CDEA68] font-semibold mb-2 ml-1">
                                    ↕ Order
                                </label>
                                <motion.select
                                    whileHover={{ scale: 1.02 }}
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full px-5 py-3 bg-zinc-800/80 text-white rounded-xl border-2 border-zinc-700/50 focus:outline-none focus:border-[#CDEA68] text-sm cursor-pointer transition-all duration-300"
                                >
                                    <option value="asc"> Ascending</option>
                                    <option value="desc"> Descending</option>
                                </motion.select>
                            </div>

                            {/* Reset Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleResetFilters}
                                className="px-8 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/40 text-red-400 rounded-xl font-bold hover:from-red-500/30 hover:to-red-600/30 hover:border-red-500/60 transition-all duration-300 shadow-lg shadow-red-500/10"
                            >
                                Reset All
                            </motion.button>
                        </div>

                        {/* Results Count */}
                        {!loading && pagination && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 pt-6 border-t border-zinc-700/50"
                            >
                                <p className="text-sm text-zinc-400">
                                    Showing <span className="text-[#CDEA68] font-bold">{pagination.total}</span> products
                                    {search && <span> matching "<span className="text-white font-semibold">{search}</span>"</span>}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Loading State */}
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
                            <p className="mt-6 text-xl text-zinc-400">Loading products...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error State */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/20 border border-red-500/50 rounded-3xl p-8 mb-8"
                        >
                            <p className="text-red-400 mb-4">⚠️ {error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Display */}
                {!loading && !error && (
                    <>
                        {items.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-[#CDEA68]/20"
                            >
                                <div className="text-8xl mb-6">📦</div>
                                <h3 className="text-3xl font-bold mb-4 text-[#CDEA68]">No Products Found</h3>
                                <p className="text-2xl text-zinc-400 mb-8">We couldn't find any products matching your criteria.</p>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleResetFilters}
                                            className="px-8 py-4 bg-[#CDEA68] text-[#004D54] rounded-2xl font-bold hover:bg-[#dfff7a] transition-all"
                                        >
                                            Reset Filters
                                        </button>
                                        <Link
                                            to="/admin"
                                            className="px-8 py-4 bg-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-700 transition-all border border-zinc-700"
                                        >
                                            Go to Admin
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                {/* Bento Grid Layout */}
                                {viewMode === "bento" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-6"
                                    >
                                        {items.map((item, idx) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className={getBentoClass(idx)}
                                                onHoverStart={() => setHoveredCard(item.id)}
                                                onHoverEnd={() => setHoveredCard(null)}
                                            >
                                                <Link to={`/products/${item.id}`} className="block h-full group">
                                                    <motion.div
                                                        whileHover={{ y: -5 }}
                                                        className="relative h-full bg-zinc-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#CDEA68]/20 hover:border-[#CDEA68]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#CDEA68]/20"
                                                    >
                                                        {/* Image */}
                                                        <div className="absolute inset-0">
                                                            {item.images && item.images.length > 0 ? (
                                                                <motion.img
                                                                    src={item.images[0]}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    animate={{ scale: hoveredCard === item.id ? 1.1 : 1 }}
                                                                    transition={{ duration: 0.6 }}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = "https://placehold.co/600x400?text=Image+N/A";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                                                                    <span className="text-6xl">📦</span>
                                                                </div>
                                                            )}
                                                            {/* Gradient Overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                            {/* Category Badge */}
                                                            {item.category && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="mb-2"
                                                                >
                                                                    <span className="inline-block px-3 py-1 bg-[#CDEA68]/20 border border-[#CDEA68]/40 backdrop-blur-xl rounded-full text-xs text-[#CDEA68] font-semibold">
                                                                        {item.category}
                                                                    </span>
                                                                </motion.div>
                                                            )}

                                                            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                                                                {item.name}
                                                            </h3>

                                                            <div className="flex items-center justify-between">
                                                                <span className="text-3xl font-bold text-[#CDEA68]">
                                                                    ${item.price}
                                                                </span>
                                                                {item.stock > 0 ? (
                                                                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded-full text-xs font-semibold">
                                                                        In Stock
                                                                    </span>
                                                                ) : (
                                                                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-full text-xs font-semibold">
                                                                        Sold Out
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Hover Arrow */}
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{
                                                                    opacity: hoveredCard === item.id ? 1 : 0,
                                                                    x: hoveredCard === item.id ? 0 : -10
                                                                }}
                                                                className="mt-4 flex items-center gap-2 text-[#CDEA68] font-semibold"
                                                            >
                                                                <span>View Details</span>
                                                                <span>→</span>
                                                            </motion.div>
                                                        </div>

                                                        {/* Wishlist Button */}
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => toggleWishlist(e, item)}
                                                            className="absolute top-4 right-4 p-3 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-700/50 hover:border-pink-500/50 transition-all z-10"
                                                        >
                                                            <Heart
                                                                size={20}
                                                                className={`transition-all ${wishlistItems.includes(item._id || item.id)
                                                                    ? "fill-pink-500 text-pink-500"
                                                                    : "text-white"
                                                                    }`}
                                                            />
                                                        </motion.button>
                                                    </motion.div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Grid Layout */}
                                {viewMode === "grid" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                    >
                                        {items.map((item, idx) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ y: -10 }}
                                                className="relative"
                                            >
                                                <Link to={`/products/${item.id}`} className="block">
                                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#CDEA68]/20 hover:border-[#CDEA68]/50 transition-all">
                                                        <div className="aspect-square bg-zinc-800/50">
                                                            {item.images?.[0] ? (
                                                                <img
                                                                    src={item.images[0]}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = "https://placehold.co/600x400?text=Image+N/A";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                                                            )}
                                                        </div>
                                                        <div className="p-4">
                                                            <h3 className="text-lg font-bold text-[#CDEA68] mb-2 truncate">{item.name}</h3>
                                                            <p className="text-2xl font-bold text-white">${item.price}</p>
                                                        </div>
                                                    </div>
                                                </Link>

                                                {/* Wishlist Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => toggleWishlist(e, item)}
                                                    className="absolute top-4 right-4 p-3 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-700/50 hover:border-pink-500/50 transition-all z-10"
                                                >
                                                    <Heart
                                                        size={20}
                                                        className={`transition-all ${wishlistItems.includes(item._id || item.id)
                                                            ? "fill-pink-500 text-pink-500"
                                                            : "text-white"
                                                            }`}
                                                    />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* List Layout */}
                                {viewMode === "list" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        {items.map((item, idx) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                                whileHover={{ x: 10 }}
                                                className="relative"
                                            >
                                                <Link to={`/products/${item.id}`}>
                                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 border border-[#CDEA68]/20 hover:border-[#CDEA68]/50 transition-all flex gap-6">
                                                        <div className="w-32 h-32 bg-zinc-800/50 rounded-xl overflow-hidden flex-shrink-0">
                                                            {item.images?.[0] ? (
                                                                <img
                                                                    src={item.images[0]}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = "https://placehold.co/600x400?text=Image+N/A";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-2xl font-bold text-[#CDEA68] mb-2">{item.name}</h3>
                                                            <p className="text-zinc-400 mb-3 line-clamp-2">{item.description}</p>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-3xl font-bold text-white">${item.price}</span>
                                                                {item.category && (
                                                                    <span className="px-3 py-1 bg-[#CDEA68]/20 border border-[#CDEA68]/30 rounded-full text-xs text-[#CDEA68]">
                                                                        {item.category}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>

                                                {/* Wishlist Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => toggleWishlist(e, item)}
                                                    className="absolute top-4 right-4 p-3 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-700/50 hover:border-pink-500/50 transition-all z-10"
                                                >
                                                    <Heart
                                                        size={20}
                                                        className={`transition-all ${wishlistItems.includes(item._id || item.id)
                                                            ? "fill-pink-500 text-pink-500"
                                                            : "text-white"
                                                            }`}
                                                    />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Pagination */}
                                {pagination && pagination.totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-16 flex justify-center items-center gap-4"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-8 py-4 bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-[#CDEA68]/30 disabled:opacity-30 font-semibold"
                                        >
                                            ← Prev
                                        </motion.button>
                                        <div className="px-6 py-4 bg-[#CDEA68]/20 border border-[#CDEA68]/30 rounded-2xl font-bold text-[#CDEA68]">
                                            {pagination.currentPage} / {pagination.totalPages}
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === pagination.totalPages}
                                            className="px-8 py-4 bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-[#CDEA68]/30 disabled:opacity-30 font-semibold"
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
