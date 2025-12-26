const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  // Prevent directory traversal
  const safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath === '/' || safePath === '\\' ? 'index.html' : safePath);
  
  let extname = String(path.extname(filePath)).toLowerCase();

  fs.readFile(filePath, (error, content) => {
    if (error) {
       // SPA Fallback: if file not found and no extension (likely a route), serve index.html
       if(error.code === 'ENOENT' && !extname) {
           fs.readFile(path.join(DIST_DIR, 'index.html'), (err, indexContent) => {
               if(err) {
                   res.writeHead(500);
                   res.end('Error loading index.html');
               } else {
                   res.writeHead(200, { 'Content-Type': 'text/html' });
                   res.end(indexContent, 'utf-8');
               }
           });
           return;
       }
       
       if(error.code == 'ENOENT'){
           res.writeHead(404);
           res.end('404 Not Found');
       } else {
           res.writeHead(500);
           res.end('Error: '+error.code+' ..\n');
       }
    } else {
       const contentType = mimeTypes[extname] || 'application/octet-stream';
       res.writeHead(200, { 'Content-Type': contentType });
       res.end(content, 'utf-8');
    }
  });

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
