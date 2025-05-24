import React from 'react'

const Featured = () => {
  return (
    <div className='w-full py-10'>
        <div className="w-full px-20 border-b-[1px] border-zinc-700 pb-15">
            <h1 className='text-8xl'>Featured Projects</h1>
        </div>
            <div className="px-20">
            <div className="cards w-full flex gap-10 mt-10">
                <div className="cardContainer bg-red-500 w-1/2 relative  h-[75vh]">
                    <h1 className="absolute text-[#CDEA68] z-[9] -mb-10 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"FYDE".split('').map((item,index) => <span key={index}>{item}</span> )}
                    </h1>
                    <div className="overflow-hidden w-full h-full bg-green-600 rounded-xl scale-50">
                        <img src="" alt="" />    
                    </div>   
                </div>
                <div className="cardContainer bg-red-500 w-1/2 relative  h-[75vh]">
                    <h1 className="absolute text-[#CDEA68] z-[9] -mb-10 top-1/2 right-full translate-x-1/2 -translate-y-1/2 leading-none tracking-right text-8xl">
                        {"VISE".split('').map((item,index) => <span key={index}>{item}</span> )}
                    </h1>
                    <div className="overflow-hidden w-full h-full bg-green-600 rounded-xl scale-50">
                        <img src="" alt="" />    
                    </div>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured