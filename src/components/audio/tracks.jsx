import { useRef, useEffect, useState } from 'react';
import trackList from '../../db/tracks.json';
import './tracks.scss';

// Pre-import all known audio files
const audioImports = {
  'swan_lake.mp3': () => import('../../assets/swan_lake.mp3'),
  'bellas_lullaby.mp3': () => import('../../assets/bellas_lullaby.mp3')
};

export default function Track({ trackId }) {
  const audioRef = useRef(null);
  const [trackData, setTrackData] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [error, setError] = useState(null);

  // Load track data and audio file
  useEffect(() => {
    const loadTrack = async () => {
      try {
        // Find track in JSON
        const track = trackList.find(t => t.id === trackId);
        if (!track) throw new Error(`Track ${trackId} not found`);
        
        // Dynamically import audio file
        const importFn = audioImports[track.audioFile];
        if (!importFn) throw new Error(`Audio file ${track.audioFile} not registered`);
        
        const module = await importFn();
        setTrackData(track);
        setAudioSrc(module.default);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Track loading error:', err);
      }
    };

    loadTrack();
  }, [trackId]);

  // Handle playback with interaction requirements
  useEffect(() => {
    if (!audioRef.current || !audioSrc || !userInteracted) return;

    const playAudio = () => {
      audioRef.current.play()
        .catch(err => {
          console.error('Playback failed:', err);
          setError('Playback blocked - click the audio controls');
        });
    };

    playAudio();

    // Optional: Auto-play on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        playAudio();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [audioSrc, userInteracted]);

  // Interaction unlocker
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  if (error) {
    return <div className="track-error">Error: {error}</div>;
  }

  if (!trackData || !audioSrc) {
    return <div className="track-loading">Loading track...</div>;
  }

  return (
    <div >
      <audio
      className="music-player"
        ref={audioRef}
        src={audioSrc}
        controls
        loop
        preload="auto"
        muted={!userInteracted}
      />
    </div>
  );
}