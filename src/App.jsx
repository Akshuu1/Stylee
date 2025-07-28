import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Marquee from './components/Marquee'
import About from './components/About'
import Eyes from './components/Eyes'
import Featured from './components/Featured'
import Cards from './components/Cards'
import Footer from './components/Footer'
import School from './components/School'
import LocomotiveScroll from 'locomotive-scroll';
import BackgroundMusic from './components/BackgroundMusic'
import { NavbarDemo } from './components/Animations/Navbar-Animated'
const App = () => {

  const locomotiveScroll = new LocomotiveScroll();

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white overflow-hidden'> 
  <NavbarDemo />

      <BackgroundMusic />
      {/* <Navbar /> */}
      <LandingPage />
      <Marquee />
      <About />
      <Eyes />
      <Featured />
      <Cards />
      <School />
      <Footer />
    </div>
  )
}

export default App;