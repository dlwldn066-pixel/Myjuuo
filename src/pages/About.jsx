import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './About.css';

const About = () => {
  return (
    <PageTransition className="about-container">
      <div className="about-content">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="about-image glass"
          style={{ padding: 0, overflow: 'hidden' }}
        >
          <img src="/cute-jiwoo.png" alt="Jiwoo Character" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-text"
        >
          <h1 className="title">
            Coding with <span className="text-neon-pink">Passion</span>
          </h1>
          <p className="bio" style={{ wordBreak: 'keep-all', lineHeight: '1.8', color: '#ccc' }}>
            안녕하세요! 심미성과 기능성의 완벽한 조화를 꿈꾸는 소프트웨어 공학도, 이지우입니다. <br /><br />
            저는 단순히 코드를 작성하는 것을 넘어, 사용자의 눈에 보이지 않는 로직의 탄탄함과 눈에 보이는 UI의 세밀함이 만나는 지점에서 가치를 찾습니다. 
            소프트웨어 공학 전공 새내기로서 매일 쏟아지는 새로운 기술들을 탐구하는 것에 큰 즐거움을 느끼며, 특히 사용자 중심의 인터페이스(UI)를 설계하고 이를 실제 기능으로 구현해 내는 과정에 몰입하고 있습니다. <br /><br />
            이곳은 제가 마주한 기술적 도전들과 디자인적 고민들, 그리고 한 걸음씩 성장해 나가는 저의 모든 여정을 기록하는 소중한 공간입니다.
          </p>
          
          <div className="skills glass">
            <h3>Tech Stack</h3>
            <div className="tags">
              <span className="tag">React</span>
              <span className="tag">Vite</span>
              <span className="tag">Framer Motion</span>
              <span className="tag">CSS Animation</span>
            </div>
          </div>

          <div className="social-links">
            <a href="#" className="social-icon"><Code /></a>
            <a href="#" className="social-icon"><Globe /></a>
            <a href="#" className="social-icon"><Mail /></a>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;
