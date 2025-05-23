import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed z-100 w-full px-20 py-8 flex justify-between items-center'>
        <div className="logo text-2xl">
            <h2>Ochi</h2>
        </div>
        <div className="links flex gap-10">
            {['Services','Our Work','About Us','Insights','Contact'].map((item,index) => (
                <a href="#" key={index} className={`text-1xl capatalize font-light ${index === 4 &&" ml-32"}`}>{item}</a>
            ))}
        </div>
    </div>
  )
}

export default Navbar