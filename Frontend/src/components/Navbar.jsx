import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let zinc = (document.body.classList.contains('bg-zinc-900'));
    setShow(zinc)

    // Fetch categories
    fetch('http://localhost:5001/items/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(err => console.error("Failed to fetch categories", err));
  }, [])

  if (show) return null

  return (
    <div className='fixed z-50 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 flex justify-between items-center bg-gradient-to-b from-[#004D54]/90 to-transparent backdrop-blur-sm'>

      <Link to="/" className="logo">
        <motion.h2 style={{ fontFamily: "Beikho" }} className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2vw] text-[#CDEA68]'>Stylee´</motion.h2>
      </Link>

      <div style={{ fontFamily: "Gilroy-Light" }} className="links justify-center items-center text-center hidden md:flex gap-4 lg:gap-10 text-white relative">
        <Link to="/" className="text-sm lg:text-base capitalize font-light hover:text-[#CDEA68] transition-colors">Home</Link>

        {/* Categories Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link
            to="/products"
            className="text-sm lg:text-base capitalize font-light hover:text-[#CDEA68] transition-colors flex items-center gap-1"
          >
            Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Link>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#004D54] border border-[#CDEA68]/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-md">
              <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
                <Link
                  to="/products"
                  className="block px-4 py-2 text-sm text-left hover:bg-[#CDEA68]/10 hover:text-[#CDEA68] transition-colors border-b border-[#CDEA68]/10"
                >
                  All Products
                </Link>
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="block px-4 py-2 text-sm text-left hover:bg-[#CDEA68]/10 hover:text-[#CDEA68] transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/about" className="text-sm lg:text-base capitalize font-light hover:text-[#CDEA68] transition-colors">About</Link>

        {isAdmin() && (
          <Link to="/admin" className="text-sm lg:text-base capitalize font-light text-[#CDEA68] border-b border-[#CDEA68]">
            Admin Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="w-10 h-10 rounded-full bg-[#CDEA68] flex items-center justify-center text-[#004D54] font-bold border border-white/20">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </Link>
          </div>
        ) : (
          <Link to="/login" className="px-5 py-2 rounded-full border border-[#CDEA68] text-[#CDEA68] hover:bg-[#CDEA68] hover:text-[#004D54] transition-all text-sm font-semibold">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar