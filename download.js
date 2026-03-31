import fs from 'fs';

async function download() {
  const urls = [
    // Gallery
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80&fit=crop", // Neon
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&fit=crop", // Cyber setup
    "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80&fit=crop", // Abstract lines
    "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=800&q=80&fit=crop", // Neon streak
    "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80&fit=crop", // Starboy neon
    "https://images.unsplash.com/photo-1518972553106-90ee92cb1bf3?w=800&q=80&fit=crop", // Dark blurry street
    
    // Music
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop", // Deep dark fluid
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80&fit=crop", // Red concert
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80&fit=crop", // DJ setup
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80&fit=crop", // Studio console
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f577f8?w=800&q=80&fit=crop"  // Moody tape
  ];
  
  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i]);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(`public/vibe_${i}.jpg`, Buffer.from(buffer));
      console.log('Downloaded vibe_' + i);
    } catch (e) {
      console.error('Failed vibe_' + i, e);
    }
  }
}

download();
