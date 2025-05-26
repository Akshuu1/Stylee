import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const togglePlay = () => {
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }

      setIsPlaying(prev => !prev);
    };

    document.addEventListener('click', togglePlay);
    document.addEventListener('touchstart', togglePlay);

    return () => {
      document.removeEventListener('click', togglePlay);
      document.removeEventListener('touchstart', togglePlay);
    };
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop>
      <source src="public/music/music.mp3" type="audio/mp3" />
      Your browser does not support the audio tag.
    </audio>
  );
};

export default BackgroundMusic;
