import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './Post.css';

const Post = () => {
  const { id } = useParams();

  return (
    <PageTransition className="post-container">
      <div className="back-link">
        <Link to="/blog" className="text-neon-cyan"><ArrowLeft size={16} /> Back to Blog</Link>
      </div>
      <article className="post-content glass">
        <header className="post-header-detail">
          <div className="post-meta"><Calendar size={14} /> 2026-03-31</div>
          <h1 className="post-title-detail text-gradient">Detailed Post View #{id}</h1>
          <div className="post-pills">
            <span className="post-pill">Story</span>
            <span className="post-pill">Life</span>
          </div>
        </header>

        <section className="post-body">
          <p>
            Welcome to the detailed view of the post. This is where the magic happens. 
            Code, life, bugs, and coffee - all merged into this neon light.
          </p>
          <h2>The Journey</h2>
          <p>
            When I first started to code, I never thought I would be creating dynamic pages using 
            Framer Motion and React. The mesh gradients and glass effects really bring the site to life.
            Every pixel is intentionally placed.
          </p>
          <div className="content-mock-img bg-2"></div>
        </section>
      </article>
    </PageTransition>
  );
};
export default Post;
