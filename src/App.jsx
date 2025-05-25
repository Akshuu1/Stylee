import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Featured from './components/Featured'
import Cards from './components/Cards'
import Footer from './components/Footer'
import Sets from './components/Sets'
import LocomotiveScroll from 'locomotive-scroll';
import BackgroundMusic from './components/BackgroundMusic'

const App = () => {

  const locomotiveScroll = new LocomotiveScroll();


  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white overflow-hidden'> 
    <BackgroundMusic />
      <Navbar />
      <LandingPage />
      <Marquee />
      <About />
      <Eyes />
      <Featured />
      <Cards />
      <Sets />
      <Footer />
    </div>
  )
}

export default App