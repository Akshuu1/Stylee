import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [show, setShow] = useState(false)

  useEffect(() => {
    let zinc = (document.body.classList.contains('bg-zinc-900'));
    setShow(zinc)
  }, [])

  if (show) return null

  return (
    <div className='fixed z-50 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 flex justify-between items-center bg-gradient-to-b from-[#004D54]/90 to-transparent backdrop-blur-sm'>

      <Link to="/" className="logo">
        <motion.h2 style={{ fontFamily: "Beikho" }} className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2vw] text-[#CDEA68]'>Stylee´</motion.h2>
      </Link>

      <div style={{ fontFamily: "Gilroy-Light" }} className="links justify-center items-center text-center hidden md:flex gap-4 lg:gap-10 text-white">
        {['Home', 'Products', 'About'].map((item, index) => (
          <Link
            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
            key={index}
            className={`text-sm lg:text-base capitalize font-light hover:text-[#CDEA68] transition-colors`}
          >
            {item}
          </Link>
        ))}

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