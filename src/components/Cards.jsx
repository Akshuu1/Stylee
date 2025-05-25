import React from 'react'

const Cards = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-5 p-32 border-t'>
      <h1>Fashion Through Decades</h1>
      <div className="flex">
        <div className="cardContainer h-[50vh] w-1/2">
            <div className="card w-full rounded-xl h-full bg-[#004D43]">
                <img src="src/assets/pexels-bemistermister-380311.jpg" alt="" />
                <button className="absolute px-5 py-3 border-2">HEY</button>
            </div>
        </div>
        <div className="cardContainer flex gap-5 h-[50vh] w-1/2">
            <div className="card w-1/2 rounded-xl h-full bg-[#192826]">
              <img src="src/assets/pexels-mahmoud-abdelwahab-3667715-7083673.jpg" alt="" />
            </div>
            <div className="card w-1/2 rounded-xl h-full bg-[#292826]">
              <img src="src/assets/pexels-yakup-polat-420882786-16912191.jpg" alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cards