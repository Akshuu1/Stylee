import {motion} from 'framer-motion';
import React from 'react'
const Marquee = () => {
  return (
    <div className='w-full bg-[#004D54] py-20 rounded-tl-3xl rounded-tr-3xl'>
        <div className="text border-t-2  border-b-2 border-zinc-300 flex whitespace-nowrap gap-12">
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease:"linear", repeat:Infinity , duration:5}} className='text-[20vw] leading-none uppercase mb-1 tracking-tighter'>We are Ochi</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease:"linear" ,repeat:Infinity , duration:5}} className='text-[20vw] leading-none uppercase mb-1 tracking-tighter'>We are Ochi</motion.h1>
        </div>
    </div>
  )
}

export default Marquee