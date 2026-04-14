import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { posts } from '../data/posts';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = posts.find((p) => p.id === parseInt(id));

  const handleBack = () => {
    navigate('/blog', { state: { fromCategory: location.state?.fromCategory } });
  };

  if (!post) {
    return (
      <PageTransition className="post-page-wrapper">
        <div className="post-reading-container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
          <span onClick={handleBack} className="post-hero-back text-neon-cyan" style={{cursor:'pointer', display:'inline-flex', alignItems:'center', gap:'0.5rem', marginBottom: '2rem'}}>
            <ArrowLeft size={16} /> 돌아가기
          </span>
          <h2>게시글을 찾을 수 없습니다.</h2>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="post-page-wrapper">
      {/* Immersive Hero Section */}
      <div 
        className="post-hero-section" 
        style={{ backgroundImage: `url(${post.images[0]})` }}
      >
        <div className="post-hero-overlay">
          <div className="post-hero-content">
            <span onClick={handleBack} className="post-hero-back">
              <ArrowLeft size={16} /> 목록으로 돌아가기
            </span>
            <div className="post-meta-hero">
              <Calendar size={14} /> {post.date} &nbsp;&nbsp;|&nbsp;&nbsp; {post.category}
            </div>
            <h1 className="post-title-hero">{post.title}</h1>
            <div className="post-tags-hero">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag-hero">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Content Area */}
      <div className="post-reading-container">
        <article className="post-reading-body">
          {post.content.map((text, idx) => (
            <p key={idx} className="post-paragraph">{text}</p>
          ))}
          
          {post.images.length > 1 && (
            <div className="post-extra-images">
              {post.images.slice(1).map((img, idx) => (
                <img key={idx} src={img} alt="Post visual" className="post-inline-image" />
              ))}
            </div>
          )}

          {post.music && (
            <div className="inline-music-player glass" style={{ flexDirection: 'column', padding: '1.5rem', marginTop: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', marginBottom: '1rem' }}>
                <div className="inline-disk-wrapper">
                  <img src={post.music.cover} alt="album" className="spin-disk" />
                  <div className="disk-hole"></div>
                </div>
                <div className="inline-music-info" style={{ textAlign: 'left' }}>
                  <div className="now-playing-label text-neon-cyan">Now Playing</div>
                  <h4 style={{ margin: '0.2rem 0', fontSize: '1.2rem' }}>{post.music.title}</h4>
                  <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>{post.music.artist}</p>
                </div>
              </div>
              <audio 
                src={post.music.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"} 
                controls 
                style={{ width: '100%', outline: 'none', borderRadius: '30px' }} 
              />
            </div>
          )}
        </article>

        {/* Elegant Footer */}
        <div className="post-author-footer">
          <div className="author-avatar-small">
            <span className="text-neon-cyan" style={{ fontSize: '0.8rem', fontWeight: 800 }}>JIWOO</span>
          </div>
          <div className="author-details">
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem' }}>지우 (Jiwoo)</h4>
            <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>순간의 감정과 기억들을 모아두는 작은 공간.</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Post;
