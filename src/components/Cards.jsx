import React, { useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [mainIndex, setMainIndex] = useState(0);

  const images = [
    {
      id: 1,
      src: 'src/assets/pexels-bemistermister-380311.jpg',
      bg: '#004D43',
      text: "🌍👠 “The Now of Style – Fashion 2025 👠🌍A bold blend of technology, gender fluidity, nostalgia, and conscious beauty.",
    },
    {
      id: 2,
      src: 'src/assets/pexels-mahmoud-abdelwahab-3667715-7083673.jpg',
      bg: '#192826',
      text: "💿🌈 “The Y2K Era – Fashion Rewired 🌈💿 Welcome to a world of bedazzled chaos, digital dreams, and iconic silhouettes. Let’s take your audience on a time-travel to the early 2000s fashion frenzy 💋✨",
    },
    {
      id: 3,
      src: 'src/assets/pexels-yakup-polat-420882786-16912191.jpg',
      bg: '#483C32',
      text: "💋✨ The Golden Hour: Fashion in the 1950s ✨💋 The 1950s was the decade when fashion bloomed like a rose in full swing. After the war, women embraced their femininity with full skirts, cinched waists, and elegance sewn into every seam.",
    },
  ];

  const handleSwap = (hoveredIndex) => {
    if (hoveredIndex !== mainIndex) {
      const temp = [...images];
      [temp[mainIndex], temp[hoveredIndex]] = [temp[hoveredIndex], temp[mainIndex]];
      setMainIndex(hoveredIndex);
    }
  };

  return (
    <div data-scroll data-scroll-section data-scroll-speed=".4" className="w-full min-h-screen px-16 py-24 border-t bg-zinc-800 text-white">
      <h1 className="text-5xl font-semibold mb-12 font-[Gilroy-Regular]">Fashion Through Decades</h1>
      <div className="flex gap-5 h-[60vh] transition-all duration-[1s] ease-in-out">
        {images.map((img, index) => {
          const isMain = index === mainIndex;
          return (
            <div key={img.id} onMouseEnter={() => handleSwap(index)}
              className={`flip-card transition-all duration-[1s] ease-in-out rounded-2xl overflow-hidden ${
                isMain ? 'w-1/2' : 'w-1/4'
              } h-full`}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{ backgroundColor: img.bg }}>
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flip-card-back" style={{ backgroundColor: img.bg }}>
                  <div className="p-10 flex items-center justify-center h-full">
                    <h2 className="text-xl font-semibold text-center">{img.text}</h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
