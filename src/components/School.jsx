import React from 'react'

const Sets = () => {
  return (
    <div className="bg-[#CDEA68] w-full  text-black py-10 px-10">
      <div className="text-5xl mb-10">
        <h1>
          <span className="font-[Beikho]">Stylee´</span> School
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 ">
        
        <div className="relative w-full lg:w-1/3 hover:w-full p-4 duration-[1s] group ">
          <img
            src="src/assets/graphe-tween-AXqkhXom-K8-unsplash.jpg"
            alt="Mannequins"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"/>
          <div className="absolute inset-0   text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 className='text-3xl '>Basics of Styling</h2>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 p-4 hover:w-full duration-[1s] group">
          <img
            src="src/assets/pexels-cottonbro-6583367.jpg"
            alt="Color Palette"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"
          />
          <div className="absolute inset-0   text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 className='text-3xl '>Dive in Color Theory</h2>
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 p-4 hover:w-full duration-[1s] group">
          <img
            src="src/assets/svitlana-HbiRi1Owk9k-unsplash.jpg"
            alt="Fabrics"
            className="w-full h-[45vh] object-cover rounded-xl shadow-lg group-hover:blur-[2px]"
          />
          <div className="absolute inset-0   text-center text-white flex justify-center items-center opacity-0 group-hover:opacity-100">
            <h2 className='text-3xl '>Know about Textiles </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sets
