import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { posts } from '../data/posts';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <PageTransition className="post-container">
        <div className="back-link">
          <Link to="/blog" className="text-neon-cyan"><ArrowLeft size={16} /> Back to Blog</Link>
        </div>
        <article className="post-content glass" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Post Not Found</h2>
        </article>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="post-container">
      <div className="back-link">
        <Link to="/blog" className="text-neon-cyan"><ArrowLeft size={16} /> Back to Blog</Link>
      </div>
      <article className="post-content glass">
        <header className="post-header-detail">
          <div className="post-meta"><Calendar size={14} /> {post.date}</div>
          <h1 className="post-title-detail text-gradient">{post.title}</h1>
          <div className="post-pills">
            {post.tags.map(tag => (
              <span key={tag} className="post-pill">{tag}</span>
            ))}
          </div>
        </header>

        <section className="post-body">
          {post.content.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
          
          <div className="post-images-grid" style={{
            display: 'grid', 
            gridTemplateColumns: `repeat(${post.images.length > 1 ? 2 : 1}, 1fr)`, 
            gap: '1rem', 
            margin: '2rem 0'
          }}>
            {post.images.map((img, idx) => (
              <div key={idx} className="content-mock-img" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '300px', borderRadius: '16px' }}></div>
            ))}
          </div>

          {post.music && (
            <div className="inline-music-player glass" style={{ flexDirection: 'column', padding: '1.5rem', marginTop: '2rem' }}>
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
        </section>
      </article>
    </PageTransition>
  );
};

export default Post;
