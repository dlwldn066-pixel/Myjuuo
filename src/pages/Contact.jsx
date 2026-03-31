import React from 'react';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition className="post-container">
      <h1 className="post-title-detail text-gradient" style={{textAlign: 'center', marginTop: '5rem'}}>Contact Me</h1>
      <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem'}}>
        Drop a line, say hello, or let's build something neon together.
      </p>
      
      <div className="glass" style={{padding: '3rem', maxWidth: '600px', margin: '0 auto'}}>
        <form style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--neon-green)'}}>Name</label>
            <input type="text" style={{width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'}} placeholder="Your name" />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--neon-cyan)'}}>Message</label>
            <textarea rows="5" style={{width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'}} placeholder="Your message..."></textarea>
          </div>
          <button type="button" className="btn btn-primary" style={{alignSelf: 'flex-start'}}>
            Send Message
          </button>
        </form>
      </div>
    </PageTransition>
  );
};

export default Contact;
