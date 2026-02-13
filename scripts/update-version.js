// update-version.js
// Updates ?v=VERSION on CSS/JS links in all HTML files based on a hash of their contents
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cssPath = path.join(__dirname, '../assets/css/main.min.css');
const jsPath = path.join(__dirname, '../assets/js/main.min.js');
const htmlDir = path.join(__dirname, '../');

function getHash(filePath) {
  if (!fs.existsSync(filePath)) return '0';
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

const cssHash = getHash(cssPath);
const jsHash = getHash(jsPath);
const version = `${cssHash}${jsHash}`;

const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(htmlDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/(assets\/css\/main\.min\.css)(\?v=[^"']*)?/g, `$1?v=${version}`);
  html = html.replace(/(assets\/js\/main\.min\.js)(\?v=[^"']*)?/g, `$1?v=${version}`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated version in ${file}`);
});

console.log(`Done. Version: ${version}`);