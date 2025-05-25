import { motion } from 'framer-motion';
import React from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
const LandingPage = () => {


  return (
    <div data-scroll data-scroll-speed="-.3" className='w-full h-screen bg-zinc-900 pt-1 -mb-20'>
        <div className="textStructure mt-50 px-20 font-[Test_Founders_Grotesk] ">
            {["Unfolding the" , "stories", "woven in style"].map((item,index)=>(
                <div key = {index} className="masker">
                    <div className="w-fit flex items-end overflow-hidden ">
                        {index === 1 && ( 
                            <motion.div initial={{width:0}} animate={{width:"9vw"}} transition={{ease:[0.76,0,0.24,1,],duration:1}} className="w-[8vw] h-[6vw] rounded-md mr-[1vw] bg-red-500 relative "></motion.div>
                             )}
                        <h1 key={index} className='uppercase text-[6.5vw] leading-[5.7vw] tracking-tighter font-medium'>{item}</h1>
                    </div>
            </div>
            ))}
        </div>
        <div className='border-t-[1px] border-zinc-700 mt-22 flex justify-between items-center px-[3vw] py-[2vw] font-[Gilroy-Light]'>
            {["Where Fashion Find it's SOUL","Read | Understand | Boom"].map((item,index) =>(
                <p key = {index} className='text-[1vw] tracking-tight leading-none'>{item}</p>
            ))}

            <div className="start flex items-center gap-5">
            <div className="px-4 py-2 border-[1px] border-zinc-500 rounded-full text-md uppercase capitalize">Start</div>
            <div className="w-10 h-10 flex items-center justify-center text-white rounded-full border-[1px] border-zinc-500">
               <span className='rotate-[45deg]'>
                <FaArrowUpLong/>
                </span> 
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default LandingPage