import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
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
        <div className="post-reading-container standard-text-block" style={{ textAlign: 'center', paddingTop: '10vh' }}>
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

      {/* Reading Content Area (Cinematic alternating blocks) */}
      <div className="post-reading-wrapper">
        <article className="post-reading-body">
          {post.content.map((text, idx) => {
            // Apply cinematic full width overlap to paragraphs 1 and 2
            const isCinematic = idx === 1 || idx === 2;
            const bgImg = isCinematic && post.images && post.images.length > idx ? post.images[idx] : null;

            if (bgImg) {
              return (
                <div key={idx} className="post-cinematic-block">
                  <div className="cinematic-bg" style={{ backgroundImage: `url(${bgImg})` }}></div>
                  <div className="cinematic-overlay"></div>
                  <div className="post-reading-container cinematic-text-layer">
                    <p className="post-paragraph cinematic-paragraph">{text}</p>
                  </div>
                </div>
              );
            }

            // Normal text block for intro, conclusion, etc.
            return (
              <div key={idx} className="post-reading-container standard-text-block">
                <p className="post-paragraph">{text}</p>
              </div>
            );
          })}

          <div className="post-reading-container">
            {post.music && (
              <div className="inline-music-player-container" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', marginBottom: '2rem' }}>
                  <div className="inline-disk-wrapper" style={{ border: '3px solid #111', borderRadius: '50%', overflow: 'hidden', width: '70px', height: '70px', position: 'relative' }}>
                    <img src={post.music.cover} alt="album" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="spin-disk" />
                    <div className="disk-hole" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#111', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}></div>
                  </div>
                  <div className="inline-music-info" style={{ textAlign: 'left' }}>
                    <div className="now-playing-label text-neon-cyan" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Now Playing</div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.3rem' }}>{post.music.title}</h4>
                    <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>{post.music.artist}</p>
                  </div>
                </div>
                <CustomAudioPlayer src={post.music.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"} />
              </div>
            )}
          </div>
        </article>

        {/* Elegant Footer */}
        <div className="post-reading-container">
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
      </div>
    </PageTransition>
  );
};

export default Post;
