import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(imgRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: imgRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reset'
      }
    });
  }, []);

  return (
    <div id='about' className='w-full p-4 sm:p-8 md:p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black' data-scroll-section>
      <motion.h1 style={{ fontFamily: "Gilroy-Light" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className='text-3xl md:text-5xl leading-relaxed tracking-tight font-semibold text-center max-w-6xl mx-auto'>
        Fashion is the whisper of time stitched into fabric — a language of colors, cuts, and confidence. It’s not just what you wear, it’s what you feel and become.
      </motion.h1>

      <div className="flex flex-col md:flex-row border-b-[1px] w-full border-t-[1px] mt-12 md:mt-20 border-[#a1b563] gap-10 md:gap-0">
        <div className="w-full md:w-1/2 mt-8 md:mt-20" data-scroll data-scroll-speed="0.2">
          <h1 style={{ fontFamily: "Sephora Sans" }} className='text-4xl md:text-7xl uppercase font-semibold tracking-tight'>Our Approach</h1>

          <div style={{ fontFamily: "Gilroy-Light" }} className="w-full mt-8 md:mt-10 text-xl md:text-2xl py-6 md:py-10 space-y-8 md:space-y-10">

            <div className="pb-6 border-b border-[#b9ce7d]">
              <h2 className='font-bold text-3xl md:text-4xl mb-2'>Curated With Vision</h2>
              <p className='opacity-80'>We handpick every trend, ensuring what you see is timeless and bold.</p>
            </div>

            <div className="pb-6 border-b border-[#b9ce7d]">
              <h2 className='font-bold text-3xl md:text-4xl mb-2'>Rooted in Research</h2>
              <p className='opacity-80'>Every look is backed by context — history, culture, and design.</p>
            </div>

            <div>
              <h2 className='font-bold text-3xl md:text-4xl mb-2'>Crafted for Designers</h2>
              <p className='opacity-80'>Whether you're a stylist, student, or dreamer, Styleé speaks to you.</p>
            </div>

          </div>

          <motion.button
            onClick={() => navigate('/about')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 px-8 py-4 bg-zinc-900 rounded-full text-white group relative overflow-hidden cursor-pointer"
          >
            <span className='z-10 relative uppercase text-sm font-medium tracking-wider'>Read More</span>
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-zinc-900 group-hover:bg-zinc-200 transition-colors z-10 relative">
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            {/* Hover Fill Effect */}
            <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </motion.button>
        </div>
        <div className="w-full md:w-1/2 mt-10 md:mt-20 flex justify-center items-center mb-10" data-scroll data-scroll-speed="0.5">
          <img
            src="/photos/img1.jpeg"
            alt="fashion"
            ref={imgRef}
            className='shadow-xl rounded-[2vw] h-[65vh] object-cover'
          />
        </div>

      </div>
    </div>
  );
};

export default About;
