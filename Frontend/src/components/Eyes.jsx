import React, { useEffect, useState } from 'react';

const Eyes = ({ minimal = false }) => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - window.innerWidth / 2;
      const deltaY = mouseY - window.innerHeight / 2;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const EyeBall = () => (
    <div data-scroll data-scroll-section data-scroll-speed="-.5" className="flex justify-center items-center w-[15vw] h-[15vw] min-w-[100px] min-h-[100px] bg-zinc-100 rounded-full">
      <div className="relative w-2/3 h-2/3 rounded-full bg-zinc-900">
        <div
          style={{ transform: `rotate(${rotate}deg)` }}
          className="absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] w-full h-10"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-100"></div>
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div className="flex gap-10 justify-center items-center">
        <EyeBall />
        <EyeBall />
      </div>
    );
  }

  // Full screen layout version
  return (
    <div className='w-full h-screen overflow-hidden'>
      <div data-scroll data-scroll-section data-scroll-speed="-.5" className="relative w-full h-full bg-cover bg-center bg-[url('https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-scaled.jpg')]">
        <div className="absolute flex gap-10 top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]">
          <EyeBall />
          <EyeBall />
        </div>
      </div>
    </div>
  );
};

export default Eyes;
