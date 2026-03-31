import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './Music.css';

const MOCK_PLAYLIST = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop', duration: '3:20' },
  { id: 2, title: 'Swim', artist: 'Chase Atlantic', cover: 'https://images.unsplash.com/photo-1518972553106-90ee92cb1bf3?q=80&w=300&auto=format&fit=crop', duration: '3:48' },
  { id: 3, title: 'Call Out My Name', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=300&auto=format&fit=crop', duration: '3:48' },
  { id: 4, title: 'Into It', artist: 'Chase Atlantic', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop', duration: '3:14' },
];

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <PageTransition className="music-page-container">
      <div className="music-header">
        <h1 className="title">
          Today's <span className="text-neon-purple">Music</span>
        </h1>
        <p className="subtitle text-secondary">The perfect R&B and Synthwave playlist for late-night coding.</p>
      </div>

      <div className="music-content-wrapper">
        {/* Main Player */}
        <motion.div 
          className="main-player glass"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="player-background-glow"></div>
          
          <div className="album-art-container">
            <div className="album-disk">
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop" 
                alt="Starboy Album" 
                className={`spin-disk-main ${isPlaying ? 'spinning' : ''}`} 
              />
              <div className="disk-center"></div>
            </div>
          </div>

          <div className="player-info">
            <div className="track-headers">
              <h2 className="current-title">Starboy</h2>
              <Heart className="heart-icon text-neon-pink" size={24} />
            </div>
            <p className="current-artist">The Weeknd, Daft Punk</p>
          </div>

          <div className="player-controls-container">
            <div className="progress-bar-container">
              <span className="time">1:18</span>
              <div className="progress-bar-track">
                <div className="progress-bar-fill"></div>
                <div className="progress-handle"></div>
              </div>
              <span className="time">3:50</span>
            </div>

            <div className="controls">
              <button className="control-btn"><Shuffle size={20} /></button>
              <button className="control-btn"><SkipBack size={28} /></button>
              
              <button 
                className="play-btn" 
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
                className="track-item"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: 1.01 }}
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
