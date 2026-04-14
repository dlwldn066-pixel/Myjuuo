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
      <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}>지우의 기록</h1>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>나의 일상, 생각, 그리고 작은 조각들을 모아두는 곳.</p>

      {/* Category Filter Navigation */}
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

      {/* Bento Grid with Filter Transitions */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="blog-bento-grid"
        >
          {displayedPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`, { state: { fromCategory: selectedCategory } })}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: (index % 10) * 0.05, duration: 0.5, ease: "easeOut" }}
              className={`blog-bento-card glass ${post.isLarge && selectedCategory === 'All' ? 'blog-large' : 'blog-normal'}`}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
            >
              {/* Aesthetic background using real images if available */}
              {post.images && post.images.length > 0 ? (
                <div className="blog-mock-bg" style={{ backgroundImage: `url(${post.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }}></div>
              ) : (
                <div className={`blog-mock-bg bg-gradient-${(post.id % 6) + 1}`}></div>
              )}
              
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
                  <span className="read-more-bento text-neon-cyan" style={{ pointerEvents: 'none' }}>
                    자세히 읽기 <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </PageTransition>
  );
};

export default Blog;
