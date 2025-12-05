import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    return (
        <div style={{ fontFamily: "Gilroy-Light" }} className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-[#CDEA68]">Products</h1>

                {/* Search and Filters */}
                <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-[#CDEA68]/20">
                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full px-4 py-3 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                        />
                    </div>

                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Color"
                            value={color}
                            onChange={(e) => {
                                setColor(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                        />
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min $"
                                value={minPrice}
                                onChange={(e) => {
                                    setMinPrice(e.target.value);
                                    setPage(1);
                                }}
                                className="w-1/2 px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                            />
                            <input
                                type="number"
                                placeholder="Max $"
                                value={maxPrice}
                                onChange={(e) => {
                                    setMaxPrice(e.target.value);
                                    setPage(1);
                                }}
                                className="w-1/2 px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50 placeholder-zinc-500"
                            />
                        </div>
                    </div>

                    {/* Sort and Reset */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50"
                        >
                            <option value="createdAt">Date</option>
                            <option value="price">Price</option>
                            <option value="popularity">Popularity</option>
                            <option value="name">Name</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 bg-zinc-800/80 text-white rounded-xl border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <button
                            onClick={handleResetFilters}
                            className="px-6 py-2 bg-red-600/80 hover:bg-red-700 rounded-xl transition border border-red-500/30"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CDEA68]"></div>
                        <p className="mt-4 text-zinc-400">Loading products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-6 mb-8 backdrop-blur-xl">
                        <p className="text-red-400 mb-4">{error}</p>
                        <p className="text-zinc-400 text-sm mb-4">
                            It looks like the database hasn't been set up yet. Please run the migration:
                        </p>
                        <code className="block bg-zinc-900/80 p-4 rounded-xl text-[#CDEA68] text-sm">
                            cd Backend<br />
                            npx prisma migrate dev --name add_items_and_roles
                        </code>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <>
                        {items.length === 0 ? (
                            <div className="text-center py-12 bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-[#CDEA68]/20">
                                <div className="text-6xl mb-4">📦</div>
                                <p className="text-zinc-400 text-xl mb-4">No products found</p>
                                <p className="text-zinc-500 text-sm mb-6">
                                    Add products through the admin dashboard or run the database migration first.
                                </p>
                                <Link
                                    to="/admin"
                                    className="inline-block px-6 py-3 bg-[#CDEA68] text-[#004D54] rounded-xl font-semibold hover:bg-[#dfff7a] transition"
                                >
                                    Go to Admin Dashboard
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {items.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={`/products/${item.id}`}
                                            className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#CDEA68]/20 hover:transform hover:scale-105 hover:border-[#CDEA68]/50 transition-all duration-300"
                                        >
                                            <div className="aspect-square bg-zinc-800/50 flex items-center justify-center">
                                                {item.images && item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-[#CDEA68]/30 text-4xl">📦</div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-2 truncate text-[#CDEA68]">{item.name}</h3>
                                                <p className="text-zinc-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-2xl font-bold text-[#CDEA68]">${item.price}</span>
                                                    {item.stock > 0 ? (
                                                        <span className="text-green-400 text-sm">In Stock</span>
                                                    ) : (
                                                        <span className="text-red-400 text-sm">Out of Stock</span>
                                                    )}
                                                </div>
                                                {item.category && (
                                                    <div className="mt-2">
                                                        <span className="inline-block bg-[#CDEA68]/20 border border-[#CDEA68]/30 px-2 py-1 rounded-lg text-xs text-[#CDEA68]">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination && pagination.totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-4">
                                        <button
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-6 py-2 bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-[#CDEA68]/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800/80 hover:border-[#CDEA68]/50 transition"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-zinc-400">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </span>
                                        <button
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === pagination.totalPages}
                                            className="px-6 py-2 bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-[#CDEA68]/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800/80 hover:border-[#CDEA68]/50 transition"
                                        >
                                            Next
                                        </button>
                                    </div>
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

