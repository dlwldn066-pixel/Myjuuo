import React, { useEffect, useState, useMemo } from 'react';
import './ParallaxParticles.css';

// Randomly generate stars to avoid expensive DOM writes, only done once on mount
const generateStars = (count, maxOpacity) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100, // 0 to 100%
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, // 0.5px to 3px
    opacity: Math.random() * maxOpacity + 0.2
  }));
};

const ParallaxParticles = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Far layer has small, dim, numerous stars.
  const farStars = useMemo(() => generateStars(120, 0.4), []);
  // Mid has medium stars.
  const midStars = useMemo(() => generateStars(60, 0.6), []);
  // Near has fewer, larger brighter stars.
  const nearStars = useMemo(() => generateStars(30, 0.9), []);

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      // Normalize from -1 to 1 based on screen center
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Easing multiplier (lower = floatier/drifting)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderLayer = (stars, speedStr, layerClass) => (
    <div 
      className={`particles-layer ${layerClass}`}
      style={{ transform: `translate(${mousePos.x * speedStr}px, ${mousePos.y * speedStr}px)` }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="star-dot"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="parallax-particles-container">
      {renderLayer(farStars, -15, 'layer-far')}
      {renderLayer(midStars, -40, 'layer-mid')}
      {renderLayer(nearStars, -90, 'layer-near')}
    </div>
  );
};

export default ParallaxParticles;
