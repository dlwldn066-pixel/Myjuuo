import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import './CustomAudioPlayer.css';

const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Events
    if (audio) {
      // In case data is already loaded immediately
      if (audio.readyState > 0) {
        setDuration(audio.duration);
      }
      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '0:00';
  };

  return (
    <div className="custom-audio-wrapper glass">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Progress Bar */}
      <div className="audio-progress-container">
        <span className="time-text">{formatTime(currentTime)}</span>
        <input 
          title="progress"
          type="range" 
          className="audio-progress-bar"
          min={0} 
          max={duration || 100} 
          value={currentTime} 
          onChange={handleProgressChange} 
          style={{ '--progress': `${(currentTime / (duration || 0.1)) * 100}%` }}
        />
        <span className="time-text">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        <button className="control-btn side-btn"><SkipBack size={24} fill="currentColor" /></button>
        <button className="control-btn play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }}/>}
        </button>
        <button className="control-btn side-btn"><SkipForward size={24} fill="currentColor" /></button>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
