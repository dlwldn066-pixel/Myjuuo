import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './About.css';

const About = () => {
  return (
    <PageTransition className="about-container">
      <div className="about-content">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="about-image glass"
        >
          <div className="placeholder-avatar">
            <span className="text-neon-cyan">JIWOO</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-text"
        >
          <h1 className="title">
            Coding with <span className="text-neon-pink">Passion</span>
          </h1>
          <p className="bio">
            Hello! I'm Jiwoo, a software engineering freshman who loves building aesthetic and functional digital experiences. I spend my time exploring new technologies, refining UI designs, and sharing my journey here.
          </p>
          
          <div className="skills glass">
            <h3>Tech Stack</h3>
            <div className="tags">
              <span className="tag">React</span>
              <span className="tag">Vite</span>
              <span className="tag">Framer Motion</span>
              <span className="tag">CSS Animation</span>
            </div>
          </div>

          <div className="social-links">
            <a href="#" className="social-icon"><Code /></a>
            <a href="#" className="social-icon"><Globe /></a>
            <a href="#" className="social-icon"><Mail /></a>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;
