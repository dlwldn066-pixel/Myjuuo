import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Disc } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './Home.css';

const vibesImages = [
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518972553106-90ee92cb1bf3?q=80&w=600&auto=format&fit=crop"
];

const Home = () => {
  return (
    <PageTransition className="home-container">
      {/* 1. Hero Section */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content"
        >
          <h1 className="hero-title" style={{ overflow: 'hidden' }}>
            <motion.div 
              className="text-fluid"
              initial={{ y: "100%", opacity: 0, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              Creative
            </motion.div>
            <motion.div
              className="text-gradient hip-wave"
              initial={{ y: "100%", opacity: 0, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              Daily Record
            </motion.div>
          </h1>
          <p className="hero-subtitle">
            Welcome to Jiwoo's digital space. Capturing moments, ideas, and pure aesthetics.
          </p>
          
          <div className="hero-actions">
            <Link to="/blog" className="btn btn-primary">
              Read Blog <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn btn-secondary glass">
              Who am I?
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Bento Grid Section (2026 Trend) */}
      <section className="bento-section">
        <h2 className="section-title">Life & <span className="text-neon-cyan">Inspo</span></h2>
        <div className="bento-grid">
          {/* Bento 1: Photo */}
          <motion.div 
            className="bento-card bento-photo glass"
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="bento-photo-wrapper">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" alt="Cyberpunk Setup" />
            </div>
          </motion.div>
          
          {/* Bento 2: Quote */}
          <motion.div 
            className="bento-card bento-quote glass"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <h3>"Simplicity is the soul of efficiency."</h3>
            <p className="text-neon-purple">- Austin Freeman</p>
          </motion.div>

          {/* Bento 3: Currently Playing (Music) */}
          <motion.div 
            className="bento-card bento-music glass"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="music-player">
              <div className="disk-wrapper">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" alt="Album Cover" className="spin-disk" />
                <div className="disk-hole"></div>
              </div>
              <div className="music-info">
                <div className="now-playing">
                  <span className="playing-icon"><Disc size={12} className="spin-fast" /></span>
                  Now Playing
                </div>
                <h4>Starboy</h4>
                <p>The Weeknd, Daft Punk</p>
                <div className="music-progress">
                  <div className="progress-bar"><div className="progress-fill"></div></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Latest Posts (Advanced Glassmorphism) */}
      <section className="featured">
        <h2 className="section-title">Latest <span className="text-neon-green">Vibes</span></h2>
        <div className="featured-grid">
          {[1, 2, 3].map((item, index) => (
            <motion.div 
              key={item} 
              className="featured-card glass"
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.8)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-mock-img">
                <img src={vibesImages[index]} alt={`Vibe ${item}`} className="vibe-image" />
              </div>
              <div className="card-content">
                <h3>Midnight Thoughts #{item}</h3>
                <p>Lost in the dark aesthetics and endless code...</p>
                <Link to={`/blog/${item}`} className="read-more text-neon-pink">Explore →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Github Connect */}
      <section className="github-connect glass">
        <h2 className="section-title" style={{textAlign: 'center', marginBottom: '1rem'}}>Connect & <span className="text-neon-pink">Code</span></h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="https://github.com/dlwldn066-pixel/Myjuuo" target="_blank" rel="noreferrer" className="btn btn-primary" style={{marginTop: '1rem'}}>
            Visit My GitHub <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
