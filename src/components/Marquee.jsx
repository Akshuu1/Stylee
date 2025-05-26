import {motion} from 'framer-motion';
import React from 'react'
const Marquee = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".1" className='w-full bg-[#004D54] py-20 rounded-tl-3xl rounded-tr-3xl'>
        <div style={{fontFamily:"Beikho"}} className="text border-t-2  border-b-2 border-zinc-300 flex whitespace-nowrap ">
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease:"linear", repeat:Infinity , duration:10}} className='text-[20vw] leading-none -mb-5 font-bold pr-20'>We are Stylee´</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease:"linear" ,repeat:Infinity , duration:10}} className='text-[20vw] leading-none -mb-5 font-bold pr-20'>We are Stylee´</motion.h1>
        </div>
    </div>
  )
}

export default Marquee