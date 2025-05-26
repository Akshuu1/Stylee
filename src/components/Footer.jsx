import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef(null);

  const lines = [
    ["Stylee´", "IS..."],
    ["Not just a website", "— it's a wardrobe."],
    ["A movement."],
    ["A museum of moods."],
    ["Where runways meet real life."],
    ["Where past hugs the future."],
    ["Where *YOU* become the trend."],
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".line", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none reset"
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full min-h-screen px-10 py-20 bg-zinc-900 text-zinc-100" ref={container}>
      <div className="lg:w-1/2 w-full flex flex-col justify-between">
        <div className="heading px-6 py-12 bg-zinc-800/60 rounded-xl shadow-lg backdrop-blur-md">
          {lines.map((line, index) => (
            <motion.h1 key={index} className="line text-[2.8vw] font-light uppercase leading-snug mb-4 text-left">
              {line.map((word, i) =>
                word === "Stylee´" ? (
                  <span key={i} className='font-["Beikho"] font-bold text-white text-7xl mr-3 tracking-wide'>
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word}</span>
                )
              )}
            </motion.h1>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex flex-col justify-start">
        <h1 className="text-[6vw] font-semibold uppercase leading-tight mb-8 text-white">Presentations</h1>
        <div className="dets bg-green-400/10 rounded-2xl backdrop-blur-sm h-full min-h-[50vh] w-full flex items-center justify-center">
          <p className="text-2xl text-zinc-400 italic">Slide deck or visuals here...</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
