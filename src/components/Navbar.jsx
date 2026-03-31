import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'glass-nav scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          JIWOO's <span className="text-neon-cyan">Life</span>
        </Link>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className={`nav-link ${location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path ? 'active text-neon-pink' : ''}`}>
                {link.name}
                {(location.pathname.startsWith(link.path) && link.path !== '/' || location.pathname === link.path) && (
                  <motion.div className="nav-underline" layoutId="underline" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
