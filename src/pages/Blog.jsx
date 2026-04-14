import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { posts } from '../data/posts';
import './Blog.css';

// Manual configuration of display order for categories to match user request
const categoryOrder = [
  "Past", "School", "Daily", "Routine", "Mood Music", 
  "Music Taste", "Lifestyle", "Emotion", "Self", "Future"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Group posts dynamically based on `categoryOrder`
  const groupedPosts = useMemo(() => {
    const groups = {};
    // Initialize groups in correct order
    categoryOrder.forEach(cat => groups[cat] = []);
    posts.forEach(post => {
      if (groups[post.category]) {
        groups[post.category].push(post);
      }
    });
    return groups;
  }, []);

  // Filter posts to display in the Bento Grid
  const displayedPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      // Return a "Preview Curation" of ~10 items 
      // (grabbing exactly the first item from each category)
      return categoryOrder.map(cat => groupedPosts[cat][0]).filter(Boolean);
    }
    return groupedPosts[selectedCategory] || [];
  }, [selectedCategory, groupedPosts]);

  return (
    <PageTransition className="blog-container">
      <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}>지우의 코딩 기록</h1>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>삽질과 에러, 그리고 마침내 찾아오는 작은 성취의 순간들.</p>

      {/* Category Dropdown Navigation */}
      <nav className="category-dropdown-nav">
        <button 
          className={`dropdown-main-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All (미리보기)
        </button>
        
        {categoryOrder.map(cat => (
          <div key={cat} className="dropdown-container">
            <button 
              className={`dropdown-toggle-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ▼
            </button>
            <div className="dropdown-menu glass">
              {groupedPosts[cat].map(p => (
                <Link key={p.id} to={`/blog/${p.id}`} className="dropdown-item">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bento Grid with Filter Transitions */}
      <motion.div layout className="blog-bento-grid">
        <AnimatePresence mode="popLayout">
          {displayedPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
              transition={{ delay: (index % 10) * 0.05, duration: 0.4, ease: "easeOut" }}
              className={`blog-bento-card glass ${post.isLarge && selectedCategory === 'All' ? 'blog-large' : 'blog-normal'}`}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
            >
              {/* The aesthetic background pseudo-element is handled in CSS */}
              <div className={`blog-mock-bg bg-gradient-${(post.id % 6) + 1}`}></div>
              
              <div className="blog-card-content">
                <div className="blog-card-header">
                  <span className="post-date"><Calendar size={14} /> {post.date}</span>
                  <div className="bento-tags-wrapper">
                    {post.tags.map(tag => (
                      <span key={tag} className="bento-tag blog-tag-capsule">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="blog-card-body">
                  <h2 className="post-bento-title">{post.title}</h2>
                  <p className="post-bento-excerpt">{post.excerpt}</p>
                </div>

                <div className="blog-card-footer">
                  <Link to={`/blog/${post.id}`} className="read-more-bento text-neon-cyan">
                    자세히 읽기 <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </PageTransition>
  );
};

export default Blog;
