import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Featured from './components/Featured'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white overflow-hidden'> 
      <Navbar/>
      <LandingPage />
      <Marquee />
      <About />
      <Eyes/>
      <Featured />
    </div>
  )
}

export default App