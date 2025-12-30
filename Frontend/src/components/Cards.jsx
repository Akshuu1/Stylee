import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, Zap } from 'lucide-react';
import './Cards.css';

const Cards = () => {
  const [mainIndex, setMainIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const eras = [
    {
      id: 1,
      src: '/photos/img8.jpg',
      bg: 'linear-gradient(135deg, #004D43 0%, #00736A 100%)',
      solidBg: '#004D43',
      era: "2025",
      title: "The Now of Style",
      subtitle: "Fashion 2025",
      description: "A bold blend of technology, gender fluidity, nostalgia, and conscious beauty. Fashion becomes sustainable, inclusive, and digitally enhanced.",
      highlights: ["Sustainable Fabrics", "Gender Fluidity", "Tech Integration", "Digital Fashion"],
      icon: <Zap size={28} />,
      accentColor: "#CDEA68"
    },
    {
      id: 2,
      src: '/photos/img9.jpg',
      bg: 'linear-gradient(135deg, #192826 0%, #2D4644 100%)',
      solidBg: '#192826',
      era: "2000s",
      title: "Y2K Era",
      subtitle: "Fashion Rewired",
      description: "Welcome to a world of bedazzled chaos, digital dreams, and iconic silhouettes. Low-rise jeans, velour tracksuits, and bling culture defined an era.",
      highlights: ["Low-Rise Jeans", "Velour Sets", "Butterfly Clips", "Metallic Fabrics"],
      icon: <Sparkles size={28} />,
      accentColor: "#FF6EC7"
    },
    {
      id: 3,
      src: '/photos/img10.jpg',
      bg: 'linear-gradient(135deg, #483C32 0%, #6B5D52 100%)',
      solidBg: '#483C32',
      era: "1950s",
      title: "The Golden Hour",
      subtitle: "Fashion Blossomed",
      description: "The 1950s was when fashion bloomed like a rose. After the war, women embraced femininity with full skirts, cinched waists, and elegance sewn into every seam.",
      highlights: ["Circle Skirts", "Cat-Eye Glasses", "Pencil Dresses", "Red Lipstick"],
      icon: <Heart size={28} />,
      accentColor: "#FFB6C1"
    },
  ];

  const handleSwap = (hoveredIndex) => {
    if (hoveredIndex !== mainIndex) {
      setMainIndex(hoveredIndex);
    }
  };

  return (
    <div data-scroll data-scroll-section data-scroll-speed=".4" className="w-full min-h-screen px-5 md:px-16 py-24 bg-zinc-800 rounded-tl-3xl rounded-tr-3xl text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#CDEA68] rounded-full blur-[150px] pointer-events-none"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h1 style={{ fontFamily: "Sephora Sans" }} className="text-5xl md:text-7xl font-bold mb-4 uppercase bg-gradient-to-r from-white via-[#CDEA68] to-white bg-clip-text text-transparent">
          Fashion Through Decades
        </h1>
        <p style={{ fontFamily: "Gilroy-Light" }} className="text-zinc-400 text-lg md:text-xl max-w-3xl">
          Experience the evolution of style. Hover to explore each era's signature looks and cultural moments.
        </p>
      </motion.div>

      {/* Cards Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-5 min-h-[60vh] transition-all duration-[1s] ease-in-out relative"
      >
        {eras.map((era, index) => {
          const isMain = index === mainIndex;
          return (
            <motion.div
              key={era.id}
              onMouseEnter={() => {
                handleSwap(index);
                setHoveredCard(index);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              className={`flip-card group relative transition-all duration-[1s] ease-in-out rounded-3xl overflow-hidden ${isMain ? 'md:w-1/2 w-full' : 'md:w-1/4 w-full'
                } h-[60vh] cursor-pointer`}
              style={{
                boxShadow: isMain ? '0 25px 50px -12px rgba(205, 234, 104, 0.25)' : '0 10px 30px -10px rgba(0,0,0,0.3)'
              }}
            >
              {/* Card Border Glow */}
              <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${isMain ? 'ring-2 ring-[#CDEA68] ring-opacity-50' : 'ring-1 ring-zinc-700'
                }`} />

              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front relative" style={{ background: era.bg }}>
                  <img src={era.src} alt={era.title} className="w-full h-full object-cover" />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Era Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <span className="font-mono text-sm font-bold" style={{ color: era.accentColor }}>{era.era}</span>
                  </motion.div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center" style={{ color: era.accentColor }}>
                        {era.icon}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "Sephora Sans" }} className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          {era.title}
                        </h3>
                        <p style={{ fontFamily: "Gilroy-Light" }} className="text-sm text-zinc-300">{era.subtitle}</p>
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <AnimatePresence>
                      {isMain && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex items-center gap-2 text-[#CDEA68] text-sm font-medium mt-3"
                        >
                          <Sparkles size={16} />
                          <span style={{ fontFamily: "Gilroy-Light" }}>Hover to flip & explore</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sparkle Effect on Hover */}
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.random() * 200 - 100,
                            y: Math.random() * 200 - 100
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity
                          }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: era.accentColor }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Back Side */}
                <div className="flip-card-back relative" style={{ background: era.bg }}>
                  {/* Pattern Background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                      {[...Array(144)].map((_, i) => (
                        <div key={i} className="border border-white/20" />
                      ))}
                    </div>
                  </div>

                  <div className="relative h-full p-8 md:p-10 flex flex-col justify-center">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center" style={{ color: era.accentColor }}>
                        {era.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h2 style={{ fontFamily: "Sephora Sans" }} className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {era.title}
                    </h2>

                    <p style={{ fontFamily: "Gilroy-Light" }} className="text-base md:text-lg text-zinc-200 leading-relaxed mb-6">
                      {era.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "Gilroy-Light", color: era.accentColor }}>
                        Iconic Trends
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {era.highlights.map((highlight, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-white text-sm bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
                            style={{ fontFamily: "Gilroy-Light" }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: era.accentColor }} />
                            {highlight}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p style={{ fontFamily: "Gilroy-Light" }} className="text-zinc-400 text-lg">
          Want to dive deeper? Explore our <a href='/school/fashion-decades' className="text-[#CDEA68] font-semibold cursor-pointer hover:underline">Fashion Through Decades</a> timeline
        </p>
      </motion.div>
    </div>
  );
};

export default Cards;
