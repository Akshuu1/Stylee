import React from 'react'
import Eyes from './Eyes'

const Sets = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed=".2" className="bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl w-full text-black py-10 px-10">
      <div className="text-5xl mb-10">
        <h1 style={{fontFamily:"Sephora Sans"}} >
          <span style={{fontFamily:"Beikho"}}>Stylee´</span> School
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mb-[15vw]">
        
        <div className="relative w-full lg:w-1/3 hover:w-full p-4 duration-[1s] group">
          <img
            src="/photos/img11.jpg"
            alt="Mannequins"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"
          />
          <div className="absolute inset-0 text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 style={{fontFamily:"Gilroy-Light"}} className="text-4xl font-bold">Basics of Styling</h2>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 p-4 hover:w-full duration-[1s] group">
          <img
            src="/photos/img12.jpg"
            alt="Color Palette"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"
          />
          <div className="absolute inset-0 text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 style={{fontFamily:"Gilroy-Light"}} className="text-4xl font-bold">Dive in Color Theory</h2>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 p-4 hover:w-full duration-[1s] group">
          <img
            src="/photos/img13.jpg"
            alt="Fabrics"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"
          />
          <div className="absolute inset-0 text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 style={{fontFamily:"Gilroy-Light"}} className="text-4xl font-bold">Know about Textiles</h2>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center p-10 text-zinc-800">
      <h1 className='absolute z-[-100] mb-[30vw] mt-[10vw] text-[22vw] '>Let's learn</h1>
      <Eyes minimal={true} />
      </div>
    </div>
  )
}

export default Sets
