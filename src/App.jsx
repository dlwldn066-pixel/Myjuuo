import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Gallery from './pages/Gallery';
import Music from './pages/Music';

// Main App Component with Page Transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="content-wrapper">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Dynamic Background */}
      <div className="mesh-bg">
        <div className="mesh-bg-aurora-1"></div>
        <div className="mesh-bg-aurora-2"></div>
        <div className="mesh-bg-aurora-3"></div>
      </div>
      
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;
