import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Gallery.css';

const galleryImages = [
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604005934520-dd53b6fa0f57?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-ef3b244d25ce?q=80&w=800&auto=format&fit=crop"
];

const galleryItems = [
  { id: 1, title: 'Neon Nights', type: 'PHOTOGRAPHY', isLarge: true },
  { id: 2, title: 'Cyber Setup', type: 'WORKSPACE', isLarge: false },
  { id: 3, title: 'Code Art', type: 'GENERATIVE', isLarge: false },
  { id: 4, title: 'Future City', type: 'CONCEPT', isLarge: true },
  { id: 5, title: 'Deep Space', type: 'ABSTRACT', isLarge: false },
  { id: 6, title: 'Retro Vibes', type: 'DESIGN', isLarge: false }
];

const Gallery = () => {
  return (
    <PageTransition className="gallery-container">
      <h1 className="page-title text-gradient">Visuals</h1>
      <p className="page-subtitle">A collection of moments and inspirations.</p>

      <div className="gallery-bento-grid">
        {galleryItems.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className={`gallery-bento-item glass ${item.isLarge ? 'bento-large' : 'bento-normal'}`}
            whileHover={{ y: -5, scale: 1.01 }}
          >
            <div className="gallery-mock-img">
              <img src={galleryImages[index]} alt={item.title} />
            </div>
            <div className="gallery-info-overlay">
              <span className="bento-tag">{item.type}</span>
              <h3 className="bento-title">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
};

export default Gallery;
