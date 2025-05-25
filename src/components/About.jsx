import React from 'react'

const About = () => {
  return (
    <div className='w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black'>
        <h1 className='text-5xl leading-13 tracking-tight font-[Gilroy-Light]'>Fashion is the whisper of time stitched into fabric — a language of colors, cuts, and confidence. It’s not just what you wear, it’s what you feel and become</h1>
        <div className="flex border-b-[1px] w-full border-t-[1px] mt-20 border-[#a1b563]">

            <div className="w-1/2 mt-20">
                <h1 className='text-6xl uppercase'>Our Approach</h1>
                <div className="w-full mt-10 text-2xl py-10 font-[Gilroy-Light]   ">
                  <div className="flex gap-5 mb-10 justify-start border-b">
                    <h2>Curated With Vision</h2>
                    <h2 className='mb-5'>We handpick every trend, ensuring what you see is timeless and bold.</h2>
                  </div>
                  <div className="flex gap-5 mb-10 border-b ">
                    <h2>Rooted in Research</h2>
                    <h2 className='-ml-4 mb-5'>Every look is backed by context — history, culture, and design.</h2>
                  </div>
                  <div className="flex gap mb-10">
                    <h2>Crafted for Designers</h2>
                    <h2>Whether you're a stylist, student, or dreamer, Styleé speaks to you.</h2>
                  </div>
                </div>
                <button className="flex items-center gap-5 px-8 py-4 uppercase bg-zinc-900 rounded-full text-white">Read More
                    <div className="w-3 h-3 bg-zinc-100 rounded-full">
                
                    </div>
                </button>
            </div>
            <div className="w-1/2 mt-20 ml-10 flex justify-center mb-20 ">
              <img src="src/assets/_.jpeg" alt="fasion" className='shadow-[1px_1px_50px_black] rounded-[2vw] h-[80vh]' />
            </div>
        </div>
    </div>
    
  )
}

export default About