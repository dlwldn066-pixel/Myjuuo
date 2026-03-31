import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './Music.css';

const MOCK_PLAYLIST = [
  { id: 1, title: 'CHIHIRO', artist: 'Billie Eilish', cover: '/vibe_6.jpg', duration: '4:59' },
  { id: 2, title: 'Snooze', artist: 'SZA', cover: '/vibe_7.jpg', duration: '3:21' },
  { id: 3, title: 'Get You (feat. Kali Uchis)', artist: 'Daniel Caesar', cover: '/vibe_8.jpg', duration: '4:38' },
  { id: 4, title: 'Pink + White', artist: 'Frank Ocean', cover: '/vibe_9.jpg', duration: '3:04' },
  { id: 5, title: 'Heartbreak Anniversary', artist: 'Giveon', cover: '/vibe_10.jpg', duration: '3:18' },
];

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <PageTransition className="music-page-container">
      <div className="music-header">
        <h1 className="title">
          Midnight <span className="text-neon-orange">Vinyl</span>
        </h1>
        <p className="subtitle text-secondary">A curated collection of deep R&B and late-night vibes.</p>
      </div>

      <div className="music-content-wrapper">
        {/* Main Turntable Player */}
        <motion.div 
          className="main-player glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="player-background-glow"></div>
          
          <div className="album-art-container">
            {/* The Vinyl Record */}
            <div className={`vinyl-record ${isPlaying ? 'spinning' : ''}`}>
               <div className="vinyl-groove-1"></div>
               <div className="vinyl-groove-2"></div>
               <div className="vinyl-groove-3"></div>
               <img 
                 src={MOCK_PLAYLIST[0].cover} 
                 alt="Vinyl Label" 
                 className="vinyl-label" 
               />
               <div className="vinyl-hole"></div>
            </div>
            
            {/* Turntable Tonearm (Visual detail) */}
            <div className={`tonearm ${isPlaying ? 'tonearm-playing' : ''}`}>
               <div className="tonearm-pivot"></div>
               <div className="tonearm-wand"></div>
               <div className="tonearm-headshell"></div>
            </div>
          </div>

          <div className="player-info">
            <div className="track-headers">
              <h2 className="current-title">{MOCK_PLAYLIST[0].title}</h2>
              <Heart className="heart-icon text-neon-orange" size={24} />
            </div>
            <p className="current-artist">{MOCK_PLAYLIST[0].artist}</p>
          </div>

          <div className="player-controls-container">
            <div className="progress-bar-container">
              <span className="time">1:18</span>
              <div className="progress-bar-track">
                <div className="progress-bar-fill-orange"></div>
                <div className="progress-handle-orange"></div>
              </div>
              <span className="time">{MOCK_PLAYLIST[0].duration}</span>
            </div>

            <div className="controls">
              <button className="control-btn"><Shuffle size={20} /></button>
              <button className="control-btn"><SkipBack size={28} /></button>
              
              <button 
                className="play-btn-orange" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
              </button>

              <button className="control-btn"><SkipForward size={28} /></button>
              <button className="control-btn"><Repeat size={20} /></button>
            </div>
          </div>
        </motion.div>

        {/* Playlist Section */}
        <motion.div 
          className="playlist-section glass"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="playlist-title">Up Next</h3>
          <div className="playlist-tracks">
            {MOCK_PLAYLIST.map((track, index) => (
              <motion.div 
                key={track.id} 
                className={`track-item ${index === 0 ? 'playing-track' : ''}`}
                whileHover={{ backgroundColor: 'rgba(255, 94, 0, 0.08)', scale: 1.01 }}
              >
                <div className="track-number">{index + 1}</div>
                <div className="track-cover">
                  <img src={track.cover} alt={track.title} />
                </div>
                <div className="track-details">
                  <h4 className="track-title">{track.title}</h4>
                  <p className="track-artist">{track.artist}</p>
                </div>
                <div className="track-duration">{track.duration}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Music;
