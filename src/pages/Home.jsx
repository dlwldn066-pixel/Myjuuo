import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './Home.css';

const Home = () => {
  return (
    <PageTransition className="home-container">
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Creative <br />
            <span className="text-gradient">Daily Record</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to Jiwoo's digital space. Capturing moments, ideas, and everything neon. <Sparkles className="inline-icon text-neon-cyan" />
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

      <section className="featured glass">
        <h2 className="section-title">Latest <span className="text-neon-green">Vibes</span></h2>
        <div className="featured-grid">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item} 
              className="featured-card glass"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="card-mock-img"></div>
              <div className="card-content">
                <h3>Midnight Thoughts #{item}</h3>
                <p>Lost in the neon lights and endless code...</p>
                <span className="read-more text-neon-pink">Explore →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="tech-arsenal glass">
        <h2 className="section-title">Tech <span className="text-neon-cyan">Arsenal</span></h2>
        <div className="skills-container">
          <div className="skill-item">
            <div className="skill-info"><span>React & Vite</span> <span className="text-neon-pink">90%</span></div>
            <div className="skill-bar"><motion.div initial={{width:0}} whileInView={{width:'90%'}} viewport={{once:true}} transition={{duration: 1, ease: 'easeOut'}} className="skill-fill neon-pink-bg"></motion.div></div>
          </div>
          <div className="skill-item">
            <div className="skill-info"><span>Vanilla CSS / Animation</span> <span className="text-neon-green">85%</span></div>
            <div className="skill-bar"><motion.div initial={{width:0}} whileInView={{width:'85%'}} viewport={{once:true}} transition={{duration: 1.2, ease: 'easeOut'}} className="skill-fill neon-green-bg"></motion.div></div>
          </div>
          <div className="skill-item">
            <div className="skill-info"><span>JavaScript (ES6+)</span> <span className="text-neon-cyan">80%</span></div>
            <div className="skill-bar"><motion.div initial={{width:0}} whileInView={{width:'80%'}} viewport={{once:true}} transition={{duration: 1.4, ease: 'easeOut'}} className="skill-fill neon-cyan-bg"></motion.div></div>
          </div>
        </div>
      </section>

      <section className="github-connect glass">
        <h2 className="section-title" style={{textAlign: 'center'}}>Code & <span className="text-neon-purple">Commits</span></h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
          Check out my latest open-source contributions, projects, and daily code logs.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="https://github.com/dlwldn066-pixel/Myjuuo" target="_blank" rel="noreferrer" className="btn btn-primary">
            Visit My GitHub <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
