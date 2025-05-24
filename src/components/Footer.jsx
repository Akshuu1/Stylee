import React from 'react'

const Footer = () => {
  return (
    <div className='flex gap-5 w-full h-screen p-20'>
        <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="heading">
                <h1 className='text-[8vw] font-seminold uppercase leading-none -mb-7'>Eye-</h1>
                <h1 className='text-[8vw] font-seminold uppercase leading-none -mb-9'>Opening</h1>
            </div>
            <h3>Ochi or img</h3>
        </div>
        <div className="w-1/2">
                <h1 className='text-[6vw] font-seminold uppercase leading-none -mb-9'>Presentations</h1>
                <div className="dets bg-green-400/20 h-screen w-full"></div>
            </div>

    </div>
  )
}

export default Footer