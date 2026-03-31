import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Gallery.css';

const galleryItems = [
  { id: 1, title: 'Neon Nights', type: 'Photography' },
  { id: 2, title: 'Cyber Setup', type: 'Workspace' },
  { id: 3, title: 'Code Art', type: 'Generative' },
  { id: 4, title: 'Future City', type: 'Concept' },
  { id: 5, title: 'Deep Space', type: 'Abstract' },
  { id: 6, title: 'Retro Vibes', type: 'Design' }
];

const Gallery = () => {
  return (
    <PageTransition className="gallery-container">
      <h1 className="page-title text-gradient">Visuals</h1>
      <p className="page-subtitle">A collection of moments and inspirations.</p>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="gallery-item glass"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className={`gallery-mock-img bg-${item.id % 3 + 1}`}></div>
            <div className="gallery-info">
              <h3>{item.title}</h3>
              <span className="text-neon-purple">{item.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
};

export default Gallery;
