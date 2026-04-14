import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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
      // Preview Curation
      return categoryOrder.map(cat => groupedPosts[cat][0]).filter(Boolean);
    }
    return groupedPosts[selectedCategory] || [];
  }, [selectedCategory, groupedPosts]);

  return (
    <PageTransition className="blog-container">
      <div className="blog-header-container">
        <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 900, marginBottom: '1rem' }}>지우의 기록</h1>
        <p className="page-subtitle" style={{ fontSize: '1.25rem', marginBottom: '3rem', color: '#aaa' }}>작은 감정의 조각부터 거대한 일상의 시퀀스까지, 나의 모든 여정</p>

        {/* Category Filter Navigation */}
        <nav className="category-dropdown-nav">
          <button 
            className={`dropdown-main-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All (에디터 추천)
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
      </div>

      {/* Full-Screen Edge-to-Edge Cinematic Feed */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="blog-fullscreen-feed"
        >
          {displayedPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`, { state: { fromCategory: selectedCategory } })}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="blog-fullscreen-card"
            >
              {/* Cinematic full-width background */}
              {post.images && post.images.length > 0 ? (
                <div className="blog-mock-bg" style={{ backgroundImage: `url(${post.images[0]})` }}></div>
              ) : (
                <div className={`blog-mock-bg bg-gradient-${(post.id % 6) + 1}`}></div>
              )}
              
              <div className="blog-card-overlay"></div>
              
              {/* Layered Text Content */}
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="post-date"><Calendar size={16} /> {post.date}</span>
                  <div className="bento-tags-wrapper">
                    {post.tags.map(tag => (
                      <span key={tag} className="blog-tag-capsule">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <h2 className="post-bento-title">{post.title}</h2>
                <p className="post-bento-excerpt">{post.excerpt || post.content[0]}</p>
                
                <span className="read-more-bento text-neon-cyan">
                  기록 열어보기 <ArrowRight size={20} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </PageTransition>
  );
};

export default Blog;
