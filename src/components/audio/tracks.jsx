import { useRef, useEffect } from 'react';
import audioFile from '../../assets/swan_lake.mp3'
import './tracks.scss'

export default function Track() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1 && !audioRef.current.played) {
        audioRef.current.play();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
        <audio className="music-player" ref={audioRef} src={audioFile} controls loop />
    </div>
  )
}