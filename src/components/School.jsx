import React from 'react'


const Sets = () => {
  return (
    <div className='bg-[#CDEA68] w-full h-[90vh] text-black py-10 px-15'>
      <div className="text-3xl">
        <h1><span className='font-[Beikho]'>Stylee´</span> School</h1>
        
      </div>
       <div className='w-full h-screen flex gap-5 p-32'>
        <div className="cardContainer h-[55vh] w-1/2">
            <div className="card w-full rounded-xl h-full bg-[#004D43]">
                <img src="src/assets/graphe-tween-AXqkhXom-K8-unsplash.jpg" alt="" />
                <button className="absolute px-5 py-3 border-1 rounded-full">Learn</button>
            </div>
        </div>
        <div className="cardContainer flex gap-5 h-[55vh] w-1/2">
            <div className="card w-1/2 rounded-xl h-full bg-[#192826]">
              <div className="">
                <img src="src/assets/pexels-cottonbro-6583367.jpg" alt="" />
              </div>
            </div>
            <div className="card w-1/2 rounded-xl h-full bg-[#292826]">
              <div className="">
                <img src="src/assets/svitlana-HbiRi1Owk9k-unsplash.jpg" alt="" />
              </div>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Sets