import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemsAPI } from "../services/api";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

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
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-400">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 text-xl mb-4">{error || "Product not found"}</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 text-white pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate("/products")}
                    className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
                >
                    ← Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden mb-4">
                            {item.images && item.images.length > 0 ? (
                                <img
                                    src={item.images[selectedImage]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl">
                                    📦
                                </div>
                            )}
                        </div>
                        {item.images && item.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {item.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square bg-zinc-800 rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""
                                            }`}
                                    >
                                        <img src={img} alt={`${item.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
                        <p className="text-3xl font-bold text-blue-400 mb-6">${item.price}</p>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-300 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {item.category && (
                                <div>
                                    <span className="text-gray-400">Category:</span>
                                    <p className="font-semibold">{item.category}</p>
                                </div>
                            )}
                            {item.brand && (
                                <div>
                                    <span className="text-gray-400">Brand:</span>
                                    <p className="font-semibold">{item.brand}</p>
                                </div>
                            )}
                            {item.color && (
                                <div>
                                    <span className="text-gray-400">Color:</span>
                                    <p className="font-semibold">{item.color}</p>
                                </div>
                            )}
                            {item.size && (
                                <div>
                                    <span className="text-gray-400">Size:</span>
                                    <p className="font-semibold">{item.size}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-gray-400">Stock:</span>
                                <p className={`font-semibold ${item.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                                    {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-400">Popularity:</span>
                                <p className="font-semibold">{item.popularity || 0} views</p>
                            </div>
                        </div>

                        {item.tags && item.tags.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                disabled={item.stock === 0}
                                className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition"
                            >
                                {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                            <button className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold text-lg transition">
                                ♥
                            </button>
                        </div>

                        {item.user && (
                            <div className="mt-8 pt-8 border-t border-zinc-800">
                                <p className="text-gray-400 text-sm">
                                    Listed by: <span className="text-white font-semibold">{item.user.name}</span>
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Added on {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
