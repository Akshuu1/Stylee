import React from 'react'

const About = () => {
  return (
    <div className='w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black'>
        <h1 className='text-5xl leading-13 tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, repellat laborum perferendis nisi odit similique dicta debitis facere harum ipsum?</h1>
        <div className="flex  w-full border-t-[1px] mt-20 border-[#a1b563]">
            <div className="w-1/2">
                <h1 className='text-6xl'>Our Approach:</h1>
                <button className="flex items-center gap-5 px-8 py-4 uppercase bg-zinc-900 rounded-full text-white">Read More
                    <div className="w-3 h-3 bg-zinc-100 rounded-full">

                    </div>
                </button>
            </div>
            <div className="w-1/2 h-[70vh] bg-red-500/50 rounded-3xl"></div>
        </div>
    </div>
    
  )
}

export default About