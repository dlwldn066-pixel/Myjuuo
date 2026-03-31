import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: "1학년 첫 프로젝트: 어땠냐면요 🚀",
    date: "2026-03-31",
    excerpt: "개발의 'ㄱ'자도 모르던 상태에서 무작정 부딪힌 첫 리액트(React) 프로젝트. 숱한 에러 로그 속에서 건져 올린 소중한 깨달음과 프로덕트 배포 회고록.",
    tags: ["Project", "Review"],
    isLarge: true
  },
  {
    id: 2,
    title: "프레이머 모션(Framer Motion) 애니메이션 최적화",
    date: "2026-03-25",
    excerpt: "요즘 브라우저 화면이 심심하다고요? 밋밋한 텍스트에 고급스러운 생명력을 불어넣는 2026년식 트랜지션 애니메이션과 최적화의 디테일 싸움.",
    tags: ["React", "Animation"],
    isLarge: false
  },
  {
    id: 3,
    title: "새벽 3시의 다크 모드 감성 ☕",
    date: "2026-03-20",
    excerpt: "캄캄한 방 안, 보랏빛 네온 조명 하나 켜두고 미친 듯이 에러를 잡을 때의 그 낭만. 이 코딩 감성에 완전히 중독된 것 같다.",
    tags: ["Daily", "Life"],
    isLarge: false
  }
];

const Blog = () => {
  return (
    <PageTransition className="blog-container">
      <h1 className="page-title text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800 }}>지우의 코딩 기록</h1>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>삽질과 에러, 그리고 마침내 찾아오는 작은 성취의 순간들.</p>

      <div className="blog-bento-grid">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className={`blog-bento-card glass ${post.isLarge ? 'blog-large' : 'blog-normal'}`}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
          >
            {/* The aesthetic background pseudo-element is handled in CSS */}
            <div className={`blog-mock-bg bg-gradient-${post.id}`}></div>
            
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
