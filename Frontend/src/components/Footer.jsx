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
    <div className="flex flex-col lg:flex-row gap-10 w-full min-h-screen px-6 py-10 sm:px-10 sm:py-20 bg-zinc-900 text-zinc-100" ref={container}>
      <div className="lg:w-1/2 w-full flex flex-col justify-between order-2 lg:order-1">
        <div className="heading px-4 py-8 sm:px-6 sm:py-12 bg-zinc-800/60 rounded-xl shadow-lg backdrop-blur-md">
          {lines.map((line, index) => (
            <motion.h1 style={{ fontFamily: "Gilroy-Light" }} key={index} className="line text-3xl sm:text-4xl lg:text-[2.8vw] font-light uppercase leading-snug mb-4 text-left">
              {line.map((word, i) =>
                word === "Stylee´" ? (
                  <span key={i} className='font-["Beikho"] normal-case capitalize font-bold text-white text-4xl sm:text-6xl lg:text-7xl mr-3 tracking-wide'>
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

      <div className="lg:w-1/2 w-full flex flex-col justify-start order-1 lg:order-2">
        <motion.h1 style={{ fontFamily: "Sephora Sans" }} className="text-4xl sm:text-5xl lg:text-[6vw] font-semibold uppercase leading-tight mb-8 text-white mt-10 lg:mt-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Your Story. Our Stage.
        </motion.h1>
        <motion.div ref={videoRef} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="dets rounded-2xl backdrop-blur-sm h-[40vh] sm:h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden shadow-2xl">
          <video src="/music/video/video.mp4" autoPlay muted loop playsInline className="rounded-xl sm:rounded-[2vw] w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
