import React from 'react'

const Cards = () => {
  return (
    <div className='w-full h-screen flex gap-5 p-32'>
        <div className="cardContainer h-[50vh] w-1/2">
            <div className="card w-full rounded-xl h-full bg-[#004D43]">
                <h1>OCHI or img </h1>
                <button className="absolute px-5 py-3 border-2">HEY</button>
            </div>
        </div>
        <div className="cardContainer flex gap-5 h-[50vh] w-1/2">
            <div className="card w-1/2 rounded-xl h-full bg-[#192826]"></div>
            <div className="card w-1/2 rounded-xl h-full bg-[#292826]"></div>
        </div>

    </div>
  )
}

export default Cards