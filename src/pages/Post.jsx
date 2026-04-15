import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
import { posts } from '../data/posts';
import './Post.css';

// Dynamic Cosmic Nebula Palettes for each theme!
const categoryCosmicColors = {
  "Past": ["rgba(50, 70, 120, 0.45)", "rgba(100, 130, 200, 0.5)", "rgba(20, 40, 80, 0.4)"],
  "School": ["rgba(255, 150, 50, 0.4)", "rgba(200, 80, 10, 0.5)", "rgba(120, 30, 10, 0.4)"],
  "Daily": ["rgba(0, 200, 150, 0.45)", "rgba(0, 120, 100, 0.5)", "rgba(0, 255, 180, 0.3)"],
  "Routine": ["rgba(150, 100, 255, 0.4)", "rgba(100, 50, 200, 0.5)", "rgba(50, 20, 150, 0.4)"],
  "Mood Music": ["rgba(255, 50, 100, 0.45)", "rgba(200, 20, 150, 0.5)", "rgba(100, 0, 50, 0.4)"],
  "Music Taste": ["rgba(255, 80, 50, 0.5)", "rgba(200, 10, 10, 0.5)", "rgba(255, 120, 0, 0.4)"],
  "Lifestyle": ["rgba(20, 200, 255, 0.4)", "rgba(10, 100, 200, 0.5)", "rgba(0, 50, 150, 0.4)"],
  "Emotion": ["rgba(255, 0, 80, 0.45)", "rgba(150, 0, 50, 0.5)", "rgba(255, 80, 150, 0.4)"],
  "Self": ["rgba(80, 50, 150, 0.4)", "rgba(50, 20, 100, 0.5)", "rgba(150, 100, 255, 0.4)"],
  "Future": ["rgba(0, 255, 200, 0.45)", "rgba(0, 150, 150, 0.5)", "rgba(0, 100, 255, 0.4)"]
};
const defaultCosmicColors = ["rgba(0, 180, 255, 0.45)", "rgba(138, 43, 226, 0.5)", "rgba(255, 20, 147, 0.4)"];

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = posts.find((p) => p.id === parseInt(id));

  // Retrieve current cosmic colors based on category
  const auroraColors = useMemo(() => {
    return post ? (categoryCosmicColors[post.category] || defaultCosmicColors) : defaultCosmicColors;
  }, [post]);

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
      {/* Inject dynamic cosmic aurora colors per theme globally representing the atmosphere */}
      <style>{`
        .mesh-bg-aurora-1 { background: ${auroraColors[0]} !important; }
        .mesh-bg-aurora-2 { background: ${auroraColors[1]} !important; }
        .mesh-bg-aurora-3 { background: ${auroraColors[2]} !important; }
      `}</style>
      
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
              <Calendar size={14} /> {post.date} &nbsp;&nbsp;|&nbsp;&nbsp; <span style={{ color: '#fff' }}>{post.category}</span>
            </div>
            <h1 className="post-title-hero" style={{ textShadow: `0 0 40px ${auroraColors[1]}` }}>{post.title}</h1>
            <div className="post-tags-hero">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag-hero" style={{ border: `1px solid ${auroraColors[0]}` }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Content Area */}
      <div className="post-reading-container">
        <article className="post-reading-body">
          {post.content.map((text, idx) => (
            <React.Fragment key={idx}>
              <p className="post-paragraph">{text}</p>
              {/* Inject Image 1 after paragraph 1, Image 2 after paragraph 2 */}
              {post.images && post.images.length > idx + 1 && idx < 2 && (
                <div style={{ margin: '3rem 0' }}>
                  <img src={post.images[idx + 1]} alt="Post visual" className="post-inline-image" />
                </div>
              )}
            </React.Fragment>
          ))}

          {post.music && (
            <div className="inline-music-player-container" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
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
