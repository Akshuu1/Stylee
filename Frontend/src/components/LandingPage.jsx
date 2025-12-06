import { motion } from 'framer-motion';
import React from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
const LandingPage = () => {


    return (
        <div data-scroll data-scroll-speed="-.3" className='w-full h-screen bg-zinc-900 pt-1 -mb-20'>
            <div style={{ fontFamily: "Test Founders Grotesk" }} className="textStructure mt-32 sm:mt-40 md:mt-50 px-4 sm:px-8 md:px-12 lg:px-20 font-[Test_Founders_Grotesk]">
                {["Unfolding the", "stories", "woven in style"].map((item, index) => (
                    <div key={index} className="masker">
                        <div className="w-fit flex items-end overflow-hidden">
                            {index === 1 && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "9vw" }}
                                    transition={{ ease: [0.76, 0, 0.24, 1,], duration: 1 }}
                                    className="w-[20vw] h-[15vw] sm:w-[12vw] sm:h-[9vw] md:w-[9vw] md:h-[6.5vw] lg:w-[8vw] lg:h-[6vw] rounded-md mr-[2vw] sm:mr-[1.5vw] md:mr-[1vw] bg-red-500 relative">
                                </motion.div>
                            )}
                            <h1 key={index} className='uppercase text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] leading-[11vw] sm:leading-[9vw] md:leading-[7vw] lg:leading-[5.7vw] tracking-tighter font-medium'>{item}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ fontFamily: "Gilroy-Light" }} className='border-t-[1px] border-zinc-700 mt-12 sm:mt-16 md:mt-20 lg:mt-22 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-4 sm:px-[3vw] py-4 sm:py-[2vw]'>
                {["Where Fashion Find it's SOUL", "Read | Understand | Boom"].map((item, index) => (
                    <p key={index} className='text-xs sm:text-sm md:text-base lg:text-[1vw] tracking-tight leading-none'>{item}</p>
                ))}

                <div className="start flex items-center gap-3 sm:gap-5">
                    <div className="px-3 py-2 sm:px-4 sm:py-2 border-[1px] border-zinc-500 rounded-full text-xs sm:text-sm md:text-md uppercase capitalize">Start</div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white rounded-full border-[1px] border-zinc-500">
                        <span className='rotate-[45deg]'>
                            <FaArrowUpLong />
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage