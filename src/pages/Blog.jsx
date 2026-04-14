import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { posts } from '../data/posts';
import './Blog.css';

const Blog = () => {
  return (
    <PageTransition className="blog-container">
      <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}>지우의 코딩 기록</h1>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>삽질과 에러, 그리고 마침내 찾아오는 작은 성취의 순간들.</p>

      <div className="blog-bento-grid">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: (index % 10) * 0.05, duration: 0.5, ease: "easeOut" }}
            className={`blog-bento-card glass ${post.isLarge ? 'blog-large' : 'blog-normal'}`}
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
      </div>
    </PageTransition>
  );
};

export default Blog;
