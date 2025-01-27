const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// Function to serve HTML files
const serveFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}/`;
  const reqUrl = new URL(req.url, baseURL);

  let filePath = path.join(
    __dirname,
    'public',
    reqUrl.pathname === '/' ? 'index.html' : `${reqUrl.pathname}.html`
  );

  const extname = path.extname(filePath);
  const contentType = extname === '.html' ? 'text/html' : 'text/plain';

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      serveFile(path.join(__dirname, 'public', '404.html'), 'text/html', res);
    } else {
      serveFile(filePath, contentType, res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
