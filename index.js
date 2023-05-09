const http = require('http');
const fs = require('fs');

  const server = http.createServer((req, res) => {
    if (req.url === '/original.txt') {
      // Read the original file from disk
      fs.readFile('original.txt', (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('File not found');
        } else {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(data);
        }
      });
    } else if (req.url === '/duplicate.txt') {
      // Create the source file and add personal information
      const personalInfo = 'Name: John Doe\nCity: New York\nState: NY';
      fs.writeFile('source.txt', personalInfo, (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal server error');
        } else {
          // Duplicate the original file and rename it as duplicate.txt
          fs.copyFile('original.txt', 'duplicate.txt', (err) => {
            if (err) {
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end('Internal server error');
            } else {
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('File duplicated successfully');
            }
          });
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('File not found');
    }
  });
  
  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });