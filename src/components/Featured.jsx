import { motion, useAnimation } from 'framer-motion'
import { a } from 'framer-motion/client'
import React, { useState } from 'react'

const Featured = () => {

    const cards = [useAnimation(),useAnimation()]

    const handleHolver =(index) =>{
        cards[index].start({y:0})
    }

    const handleHoverEnd = (index) =>{
        cards[index].start({y:"100%"})
    }

  return (
    <div className='w-full py-10'>
        <div className="w-full px-20 border-b-[1px] border-zinc-700 pb-15">
            <h1 className='text-8xl'>Featured Projects</h1>
        </div>
            <div className="px-20">
            <div className="cards w-full flex gap-10 mt-10">
                <motion.div 
                onHoverStart={()=>handleHolver(0)} 
                onHoverEnd={()=>handleHoverEnd(0)}
                className="cardContainer bg-red-500 w-1/2 relative  h-[75vh]">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"FYDE".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.08}} animate={cards[0]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full bg-green-600 rounded-xl scale-50">
                        <img src="" alt="" />    
                    </div>   
                </motion.div>
                <motion.div 
                onHoverStart={()=>handleHolver(1)} 
                onHoverEnd={()=>handleHoverEnd(1)}
                className="cardContainer bg-red-500 w-1/2 relative  h-[75vh]">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"VISE".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.08}} animate={cards[1]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full bg-green-600 rounded-xl scale-50">
                        <img src="" alt="" />    
                    </div>   
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Featured