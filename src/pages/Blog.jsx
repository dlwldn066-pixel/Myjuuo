import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: "1학년 첫 프로젝트: 어땠냐면요",
    date: "2026-03-31",
    excerpt: "개발의 ㄱ자도 모르던 상태에서 시작한 첫 프로젝트 회고록...",
    tags: ["Project", "Review"]
  },
  {
    id: 2,
    title: "Vite + Framer Motion 조합 최고",
    date: "2026-03-25",
    excerpt: "요즘 유행하는 다이나믹한 웹페이지 만들기, 생각보다 쉽네요.",
    tags: ["React", "Animation"]
  },
  {
    id: 3,
    title: "새벽 코딩의 매력 feat. 몬스터 에너지",
    date: "2026-03-20",
    excerpt: "밤하늘의 네온사인보다 더 빛나는 모니터 앞에서의 시간들.",
    tags: ["Daily", "Life"]
  }
];

const Blog = () => {
  return (
    <PageTransition className="blog-container">
      <h1 className="page-title text-gradient">Record of Logic</h1>
      <p className="page-subtitle">Stories, bugs, and occasional victories.</p>

      <div className="posts-list">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="post-card glass"
            whileHover={{ scale: 1.01, backgroundColor: "rgba(30, 30, 45, 0.7)" }}
          >
            <div className="post-header">
              <span className="post-date"><Calendar size={14} /> {post.date}</span>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more-btn text-neon-cyan">Read →</Link>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
};

export default Blog;
