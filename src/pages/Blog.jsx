import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { posts } from '../data/posts';
import './Blog.css';

// Manual configuration of display order for categories to match user request
const categoryOrder = [
  "Past", "School", "Daily", "Routine", "Mood Music", 
  "Music Taste", "Lifestyle", "Emotion", "Self", "Future"
];

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.fromCategory || 'All');

  // Group posts dynamically based on `categoryOrder`
  const groupedPosts = useMemo(() => {
    const groups = {};
    categoryOrder.forEach(cat => groups[cat] = []);
    posts.forEach(post => {
      if (groups[post.category]) {
        groups[post.category].push(post);
      }
    });
    return groups;
  }, []);

  // Filter posts to display
  const displayedPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      // Return a "Preview Curation" of ~10 items 
      return categoryOrder.map(cat => groupedPosts[cat][0]).filter(Boolean);
    }
    return groupedPosts[selectedCategory] || [];
  }, [selectedCategory, groupedPosts]);

  return (
    <PageTransition className="blog-container">
      <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}>지우의 기록</h1>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>나의 일상, 생각, 그리고 작은 조각들을 모아두는 곳.</p>

      {/* REVERTED: Original simple wrap Category Filter Navigation */}
      <nav className="category-dropdown-nav">
        <button 
          className={`dropdown-main-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All (미리보기)
        </button>
        
        {categoryOrder.map(cat => (
          <button 
            key={cat}
            className={`dropdown-toggle-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {selectedCategory === 'All' ? (
            /* ALL: Render classic Bento Grid for preview */
            <div className="blog-bento-grid" style={{ alignItems: 'start' }}>
              {displayedPosts.map((post, index) => {
                // Dynamic zigzag staggered offset calculations! 
                // Since it's a 5-column grid, we offset by column index to make them float naturally.
                const staggerOffsets = [0, 50, 15, 65, -15];
                const marginTopPx = staggerOffsets[index % 5];

                return (
                  <motion.div 
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`, { state: { fromCategory: selectedCategory } })}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: (index % 10) * 0.05, duration: 0.5, ease: "easeOut" }}
                    className={`blog-bento-card glass ${post.isLarge ? 'blog-large' : 'blog-normal'}`}
                    style={{ 
                      cursor: 'pointer', 
                      marginTop: `${marginTopPx}px`,
                      height: '300px', /* Fix height so margin-top doesn't squish elements during stretch */
                      border: 'none', /* Forcing border removal inline if CSS fails */
                      background: 'rgba(12, 12, 18, 0.4)'
                    }}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
                  >
                    {post.images && post.images.length > 0 ? (
                      <div className="blog-mock-bg" style={{ backgroundImage: `url(${post.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }}></div>
                    ) : (
                      <div className={`blog-mock-bg bg-gradient-${(post.id % 6) + 1}`}></div>
                    )}
                    
                    <div className="blog-card-content" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 80%)' }}>
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
                        <span className="read-more-bento text-neon-cyan" style={{ pointerEvents: 'none' }}>
                          자세히 읽기 <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* THEME: Render Edge-to-Edge 5-Column Accordion Layout! */
            <div className="blog-accordion-layout">
              {displayedPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="accordion-panel"
                  onClick={() => navigate(`/blog/${post.id}`, { state: { fromCategory: selectedCategory } })}
                >
                  {post.images && post.images.length > 0 ? (
                    <div className="accordion-bg" style={{ backgroundImage: `url(${post.images[0]})` }}></div>
                  ) : (
                    <div className={`accordion-bg bg-gradient-${(post.id % 6) + 1}`}></div>
                  )}
                  
                  <div className="accordion-content">
                    <div className="accordion-meta">
                      <span className="post-date"><Calendar size={14} /> {post.date}</span>
                    </div>
                    <h2 className="accordion-title">{post.title}</h2>
                    <p className="accordion-excerpt">{post.excerpt || post.content[0]}</p>
                    <span className="accordion-read-more text-neon-cyan">읽어보기 <ArrowUpRight size={16} /></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PageTransition>
  );
};

export default Blog;
