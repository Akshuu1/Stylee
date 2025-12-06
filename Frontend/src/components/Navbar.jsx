import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

const Navbar = () => {


  const [show, setShow] = useState(false)

  useEffect(() => {
    let zinc = (document.body.classList.contains('bg-zinc-900'));
    setShow(zinc)
  }, [])
  if (show) return null
  return (
    <div className='fixed z-100 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 flex justify-between items-center'>

      <Link to="/" className="logo">
        <motion.h2 style={{ fontFamily: "Beikho" }} className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2vw]'>Stylee´</motion.h2>
      </Link>
      <div style={{ fontFamily: "Gilroy-Light" }} className="links justify-center items-center text-center hidden md:flex gap-4 lg:gap-10">
        {['Home', 'Trends', 'Knowledge', 'About Us', 'Contact'].map((item, index) => (
          <a href="#" key={index} className={`text-sm lg:text-base capitalize font-light hover:border-b-[.5px] ${index === 4 && "lg:ml-32"}`}>{item}</a>
        ))}
      </div>
    </div>
  )
}

export default Navbar