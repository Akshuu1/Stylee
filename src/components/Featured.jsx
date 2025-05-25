import { motion, useAnimation } from 'framer-motion'
import { a } from 'framer-motion/client'
import React, { useState } from 'react'



// https://assets.vogue.in/photos/681e15ffbb42168a5a797ca9/3:4/w_2240,c_limit/SnapInsta.to_495333609_18513974965007581_8504780726696481033_n.jpg




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
            <h1 className='text-8xl'>Latest 2k´25</h1>
        </div>
            <div className="px-20">
            <div className="cards w-full flex gap-10 mt-10">
                <motion.div 
                onHoverStart={()=>handleHolver(0)} 
                onHoverEnd={()=>handleHoverEnd(0)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Runway Trends".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[0]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full  rounded-xl scale-90">
                        <img src="src/assets/pexels-toniimal-28751173.jpg" alt="" />    
                    </div>   
                </motion.div>
                <motion.div 
                onHoverStart={()=>handleHolver(1)} 
                onHoverEnd={()=>handleHoverEnd(1)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Street Style".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[1]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full rounded-xl scale-90 ">
                        <img src="src/assets/dushawn-jovic-py2NabvrB9Q-unsplash.jpg" alt="Street Style"  className='object-cover object-bottom'/>    
                    </div>   
                </motion.div>
            </div>
            <div className="cards w-full flex gap-10 mt-10">
                <motion.div 
                onHoverStart={()=>handleHolver(0)} 
                onHoverEnd={()=>handleHoverEnd(0)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Manish Malhotra's".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[0]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full  rounded-xl scale-90">
                        <img src="https://assets.vogue.in/photos/681e15ffbb42168a5a797ca9/3:4/w_2240,c_limit/SnapInsta.to_495333609_18513974965007581_8504780726696481033_n.jpg" alt="" />    
                    </div>   
                </motion.div>
                <motion.div 
                onHoverStart={()=>handleHolver(1)} 
                onHoverEnd={()=>handleHoverEnd(1)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Jacquemus".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[1]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full rounded-xl scale-90 ">
                        <img src="https://assets.vogue.com/photos/67967d46b8b9c6acdf8f6532/master/w_960,c_limit/00001-jacquemus-spring-2025-ready-to-wear-credit-gorunway.jpg" alt="Street Style"  className='object-cover object-bottom'/>    
                    </div>   
                </motion.div>
            </div>
            <div className="cards w-full flex gap-10 mt-10">
                <motion.div 
                onHoverStart={()=>handleHolver(0)} 
                onHoverEnd={()=>handleHoverEnd(0)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Future Fashion".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[0]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full  rounded-xl scale-90">
                        <img src="src/assets/irham-setyaki-WBr1YrSyEds-unsplash.jpg" alt="" />    
                    </div>   
                </motion.div>
                <motion.div 
                onHoverStart={()=>handleHolver(1)} 
                onHoverEnd={()=>handleHoverEnd(1)}
                className="cardContainer w-1/2 relative  ">
                    <h1 className="absolute flex overflow-hidden text-[#CDEA68] z-[9] -mb-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"Future Fashion".split('').map((item,index) => 
                        <motion.span initial={{y:"100%"}} transition={{ease:[0.22,1,0.36,1],delay:index*0.02}} animate={cards[1]} className='inline-block' key={index}>{item}</motion.span> 
                        )}
                    </h1>
                    <div className="overflow-hidden w-full h-full rounded-xl scale-90 ">
                        <img src="src/assets/kanchan-raj-pandey-nKf8yjuJtYQ-unsplash.jpg" alt="Street Style"  className='object-cover object-bottom'/>    
                    </div>   
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Featured