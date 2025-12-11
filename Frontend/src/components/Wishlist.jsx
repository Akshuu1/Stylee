import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { wishlistAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, isGuest } = useAuth();
    const navigate = useNavigate();

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -50]);
    const y2 = useTransform(scrollY, [0, 300], [0, 50]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            setLoading(true);

            // For guest users, use localStorage
            if (isGuest()) {
                const localWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                setWishlistItems(localWishlist);
            } else if (isAuthenticated()) {
                // For authenticated users, fetch from backend
                const response = await wishlistAPI.getWishlist();
                setWishlistItems(response.data.wishlist || []);
            } else {
                // Not logged in - redirect to login
                navigate("/login");
                return;
            }
        } catch (err) {
            console.error("Failed to fetch wishlist:", err);
            setError(err.response?.data?.message || "Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (itemId) => {
        try {
            if (isGuest()) {
                // For guest users, update localStorage
                const localWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                const updatedWishlist = localWishlist.filter(item => (item._id || item.id) !== itemId);
                localStorage.setItem("guestWishlist", JSON.stringify(updatedWishlist));
                setWishlistItems(updatedWishlist);
            } else {
                // For authenticated users, call API
                await wishlistAPI.removeFromWishlist(itemId);
                setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== itemId));
            }
        } catch (err) {
            console.error("Failed to remove from wishlist:", err);
            alert(err.response?.data?.message || "Failed to remove item");
        }
    };

    const clearWishlist = async () => {
        if (!window.confirm("Are you sure you want to clear your entire wishlist?")) {
            return;
        }

        try {
            if (isGuest()) {
                localStorage.setItem("guestWishlist", "[]");
                setWishlistItems([]);
            } else {
                await wishlistAPI.clearWishlist();
                setWishlistItems([]);
            }
        } catch (err) {
            console.error("Failed to clear wishlist:", err);
            alert(err.response?.data?.message || "Failed to clear wishlist");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] pt-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-96 bg-zinc-800/50 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-32 px-6 pb-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
                />
                {/* Geometric patterns */}
                <div className="absolute top-40 right-1/4 w-48 h-48 sm:w-64 sm:h-64 border border-[#CDEA68]/10 rotate-45 rounded-3xl" />
                <div className="absolute bottom-40 left-1/4 w-32 h-32 sm:w-48 sm:h-48 border border-[#CDEA68]/10 -rotate-12 rounded-2xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                My Wishlist
                                <motion.span
                                    className="text-6xl ml-4"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >

                                </motion.span>
                            </h1>
                            <p className="text-zinc-400 text-lg">
                                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                            </p>
                        </div>

                        {wishlistItems.length > 0 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearWishlist}
                                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-full font-medium flex items-center gap-2 transition-all"
                            >
                                <Trash2 size={20} />
                                Clear All
                            </motion.button>
                        )}
                    </div>

                    {/* Guest User Notice */}
                    {isGuest() && wishlistItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl"
                        >
                            <p className="text-amber-400 text-sm flex items-center gap-2">
                                <span>💡</span>
                                <span>
                                    Sign up to save your wishlist across devices!{" "}
                                    <Link to="/signup" className="underline font-medium">
                                        Create Account
                                    </Link>
                                </span>
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Wishlist Items Grid */}
                {wishlistItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-9xl mb-6"
                        >

                        </motion.div>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8">
                            Start adding items you love to your wishlist!
                        </p>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-lime-400 text-black font-bold rounded-full text-lg"
                            >
                                Browse Products
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((item, index) => (
                                <motion.div
                                    key={item._id || item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative"
                                >
                                    {/* Card */}
                                    <Link to={`/products/${item._id || item.id}`}>
                                        <div className="relative h-full bg-zinc-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-teal-500/50 transition-all duration-300">
                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={item.images?.[0] || "/placeholder.jpg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                {/* Category Badge */}
                                                {item.category && (
                                                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full mb-3">
                                                        {item.category}
                                                    </span>
                                                )}

                                                {/* Name */}
                                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                                                    {item.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                                                    {item.description}
                                                </p>

                                                {/* Price */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-lime-400">
                                                        ${item.price}
                                                    </span>
                                                    {item.brand && (
                                                        <span className="text-zinc-500 text-sm">
                                                            {item.brand}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Remove Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFromWishlist(item._id || item.id);
                                        }}
                                        className="absolute top-4 right-4 p-3 bg-red-500/90 hover:bg-red-600 rounded-full text-white shadow-lg z-10"
                                    >
                                        <X size={20} />
                                    </motion.button>

                                    {/* Quick View Heart */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-4 left-4 p-3 bg-pink-500/20 backdrop-blur-md rounded-full z-10"
                                    >
                                        <Heart size={20} className="text-pink-500 fill-pink-500" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                    >
                        {error}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
