import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef(null);
  const videoRef = useRef(null);

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

      gsap.from(videoRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoRef.current,
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
            <motion.h1 key={index} className="line text-[2.8vw] font-light uppercase leading-snug mb-4 text-left font-[Gilroy-Light]">
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
        <motion.h1 className=" font-[Sephora_Sans] text-[6vw] font-semibold uppercase leading-tight mb-8 text-white" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Your Story. Our Stage.
        </motion.h1>
        <motion.div ref={videoRef} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="dets rounded-2xl backdrop-blur-sm h-full min-h-[50vh] w-full flex items-center justify-center overflow-hidden shadow-2xl">
          <video src="src/assets/video/mixkit-stylish-woman-posing-with-a-camaro-car-44560-full-hd.mp4" autoPlay muted loop playsInline className="rounded-[2vw] w-full h-full object-cover"/>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
