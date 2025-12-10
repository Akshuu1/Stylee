import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { itemsAPI, wishlistAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { isAuthenticated, isGuest } = useAuth();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await itemsAPI.getById(id);
                setItem(response.data.item);
                setError(null);
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
        checkWishlistStatus();
    }, [id]);

    const checkWishlistStatus = async () => {
        try {
            if (isGuest()) {
                const local = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                setIsInWishlist(local.some(item => (item._id || item.id) === id));
            } else if (isAuthenticated()) {
                const response = await wishlistAPI.getWishlist();
                const wishlist = response.data.wishlist;
                setIsInWishlist(wishlist.some(item => (item._id || item) === id));
            }
        } catch (err) {
            console.error("Failed to check wishlist:", err);
        }
    };



    const toggleWishlist = async () => {
        if (!id || !item) return;

        try {
            if (isGuest()) {
                const localWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
                if (isInWishlist) {
                    const updated = localWishlist.filter(i => (i._id || i.id) !== id);
                    localStorage.setItem("guestWishlist", JSON.stringify(updated));
                    setIsInWishlist(false);
                } else {
                    localWishlist.push(item);
                    localStorage.setItem("guestWishlist", JSON.stringify(localWishlist));
                    setIsInWishlist(true);
                }
            } else if (isAuthenticated()) {
                if (isInWishlist) {
                    await wishlistAPI.removeFromWishlist(id);
                    setIsInWishlist(false);
                } else {
                    await wishlistAPI.addToWishlist(id);
                    setIsInWishlist(true);
                }
            }
        } catch (err) {
            console.error("Wishlist toggle error:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
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
                        Loading product details...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="text-8xl mb-6"
                    >
                        ⚠️
                    </motion.div>
                    <p className="text-red-400 text-2xl mb-6">{error || "Product not found"}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/products")}
                        className="px-8 py-4 bg-[#CDEA68] text-[#004D54] rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-[#CDEA68]/30"
                    >
                        ← Back to Products
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-20 px-4 sm:px-6 pb-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#CDEA68] rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.02, 0.05, 0.02]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#CDEA68] rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/products")}
                    className="mb-6 sm:mb-8 px-4 py-2 sm:px-6 sm:py-3 bg-zinc-900/60 backdrop-blur-2xl hover:bg-zinc-800/80 rounded-xl sm:rounded-2xl transition-all duration-300 border border-[#CDEA68]/20 font-semibold shadow-lg text-sm sm:text-base"
                >
                    ← Back to Products
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Images Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Main Image */}
                        <motion.div
                            className="aspect-square bg-zinc-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 border border-[#CDEA68]/20 shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnimatePresence mode="wait">
                                {item.images && item.images.length > 0 ? (
                                    <motion.img
                                        key={selectedImage}
                                        src={item.images[selectedImage]}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800/50">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="text-[#CDEA68]/30 text-8xl"
                                        >
                                            📦
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Thumbnail Images */}
                        {item.images && item.images.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-4 gap-4"
                            >
                                {item.images.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`aspect-square bg-zinc-900/60 backdrop-blur-2xl rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                            ? "border-[#CDEA68] shadow-lg shadow-[#CDEA68]/50"
                                            : "border-[#CDEA68]/20 hover:border-[#CDEA68]/50"
                                            }`}
                                    >
                                        <img src={img} alt={`${item.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Product Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Product Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#CDEA68]"
                        >
                            {item.name}
                        </motion.h1>

                        {/* Price */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-6 sm:mb-8"
                        >
                            <span className="text-4xl sm:text-5xl font-bold text-[#CDEA68]">
                                ${item.price}
                            </span>
                        </motion.div>

                        {/* Stock Status */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6 sm:mb-8"
                        >
                            {item.stock > 0 ? (
                                <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-sm sm:text-base font-semibold backdrop-blur-xl">
                                    ✓ {item.stock} In Stock
                                </span>
                            ) : (
                                <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full text-sm sm:text-base font-semibold backdrop-blur-xl">
                                    ✗ Out of Stock
                                </span>
                            )}
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6 sm:mb-8 p-4 sm:p-6 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/20"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[#CDEA68]">Description</h2>
                            <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">{item.description}</p>
                        </motion.div>

                        {/* Product Specifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-6 sm:mb-8 p-4 sm:p-6 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/20"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#CDEA68]">Specifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {item.category && (
                                    <div className="p-4 bg-zinc-800/50 rounded-xl border border-[#CDEA68]/20">
                                        <span className="text-zinc-400 text-sm">Category</span>
                                        <p className="font-semibold text-lg text-white">{item.category}</p>
                                    </div>
                                )}
                                {item.brand && (
                                    <div className="p-4 bg-zinc-800/50 rounded-xl border border-[#CDEA68]/20">
                                        <span className="text-zinc-400 text-sm">Brand</span>
                                        <p className="font-semibold text-lg text-white">{item.brand}</p>
                                    </div>
                                )}
                                {item.color && (
                                    <div className="p-4 bg-zinc-800/50 rounded-xl border border-[#CDEA68]/20">
                                        <span className="text-zinc-400 text-sm">Color</span>
                                        <p className="font-semibold text-lg text-white">{item.color}</p>
                                    </div>
                                )}
                                {item.size && (
                                    <div className="p-4 bg-zinc-800/50 rounded-xl border border-[#CDEA68]/20">
                                        <span className="text-zinc-400 text-sm">Size</span>
                                        <p className="font-semibold text-lg text-white">{item.size}</p>
                                    </div>
                                )}
                                <div className="p-4 bg-zinc-800/50 rounded-xl border border-[#CDEA68]/20">
                                    <span className="text-zinc-400 text-sm">Popularity</span>
                                    <p className="font-semibold text-lg text-white">⭐ {item.popularity || 0} views</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="mb-8"
                            >
                                <h2 className="text-xl font-semibold mb-3 text-[#CDEA68]">Tags</h2>
                                <div className="flex flex-wrap gap-3">
                                    {item.tags.map((tag, index) => (
                                        <motion.span
                                            key={index}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className="bg-[#CDEA68]/20 border border-[#CDEA68]/30 px-4 py-2 rounded-full text-sm text-[#CDEA68] font-semibold backdrop-blur-xl"
                                        >
                                            #{tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex gap-4 mb-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={item.stock === 0}
                                className="flex-1 px-8 py-5 bg-[#CDEA68] text-[#004D54] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#CDEA68]/30 disabled:shadow-none hover:bg-[#dfff7a]"
                            >
                                {item.stock > 0 ? "🛒 Add to Cart" : "Out of Stock"}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleWishlist}
                                className={`px-8 py-5 rounded-2xl font-bold transition-all duration-300 border-2 flex items-center justify-center gap-2 ${isInWishlist
                                    ? "bg-pink-500/20 border-pink-500/50"
                                    : "bg-zinc-900/60 border-[#CDEA68]/20 hover:bg-zinc-800/80 hover:border-[#CDEA68]/50"
                                    }`}
                            >
                                <Heart
                                    size={24}
                                    className={`transition-all ${isInWishlist
                                        ? "fill-pink-500 text-pink-500"
                                        : "text-white"
                                        }`}
                                />
                            </motion.button>
                        </motion.div>

                        {/* Seller Info */}
                        {item.user && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="p-6 bg-zinc-900/60 backdrop-blur-2xl rounded-2xl border border-[#CDEA68]/20"
                            >
                                <p className="text-zinc-400 text-sm mb-1">
                                    Listed by
                                </p>
                                <p className="text-white font-bold text-xl mb-2">{item.user.name}</p>
                                <p className="text-zinc-500 text-sm">
                                    📅 Added on {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
