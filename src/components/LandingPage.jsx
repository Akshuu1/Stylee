import React from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
const LandingPage = () => {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-1'>
        <div className="textStructure mt-50 px-20">
            {["We Create" , "Eye Opening", "Presentations"].map((item,index)=>(
                <div className="masker">
                    <div className="w-fit flex items-end overflow-hidden ">
                        {index === 1 && ( 
                            <div className="w-[8vw] h-[6vw] rounded-md mr-[1vw] bg-red-500 relative "></div>
                             )}
                        <h1 key={index} className='uppercase text-[6.5vw] leading-[5.7vw] tracking-tighter font-medium'>{item}</h1>
                    </div>
            </div>
            ))}
        </div>
        <div className='border-t-[1px] border-zinc-700 mt-22 flex justify-between items-center px-[3vw] py-[2vw]'>
            {["For Public and Private Companies","From the first pitch to IPO"].map((item,index) =>(
                <p key = {index} className='text-[1vw] font-light tracking-tight leading-none'>{item}</p>
            ))}

            <div className="start flex items-center gap-5">
            <div className="px-4 py-2 border-[1px] border-zinc-500 rounded-full font-light text-md uppercase capitalize">Start</div>
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