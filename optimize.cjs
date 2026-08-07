const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Add loading="lazy" to <img> tags without it
  // Using a regex to find <img ... >
  content = content.replace(/<img\s+([^>]*?)>/g, (match, p1) => {
    // se já tiver loading, ignora
    if (p1.includes('loading=')) return match;
    // caso contrário, adiciona loading="lazy"
    return `<img loading="lazy" ${p1}>`;
  });

  // Replace autoPlay with data-lazy="true" preload="none" on <video> tags
  // but only if it's not the hero video in App.jsx
  if (!filePath.endsWith('App.jsx')) {
    content = content.replace(/<video\b([^>]*?)autoPlay([^>]*?)>/g, (match, p1, p2) => {
      // remove autoPlay and insert data-lazy="true" preload="none"
      return `<video ${p1}data-lazy="true" preload="none"${p2}>`;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

processDir(srcDir);
console.log('Done!');
